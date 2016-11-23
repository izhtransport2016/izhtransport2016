import fetch from 'node-fetch';
import cheerio from 'cheerio';


export const TRANSPORT_TYPE_BUS = 'bus';
export const TRANSPORT_TYPE_TRAM = 'tram';
export const TRANSPORT_TYPE_TROL = 'trol';


export class Loader {

  constructor(db) {
    this.db = db;
  }


  getTransportUrl(type) {
    if (type === TRANSPORT_TYPE_BUS) {
      return `http://igis.ru/gortrans/${type}/izh/`;
    }
    return `http://igis.ru/gortrans/${type}/`;
  }


  loadStops(type, route) {
    return fetch(this.getTransportUrl(type) + route.num)
      .then((res) => {
        if (res.status === 200) {
          return res.text();
        } else {
          return Promise.reject(new Error(`Can't load information of transport type - ${type}/${route.num}`));
        }
      })
      .then((html) => {
        const $ = cheerio.load(html);
        const parseStops = function(direct) {
          const index = direct ? 0 : 1;

          return $('table.table-st3')
            .eq(index)
            .find('tr')
            .map((index, elem) => ({
              id: $(elem).find('div[data-station]').attr('data-station'),
              name: $(elem).find('a').text()
            }))
            .get()
            .filter((elem) => elem.name);
        }

        return new Promise((resolve, reject) => {
          route.direct = parseStops(true);
          route.reverse = parseStops(false);

          resolve();
        });
      });
  }


  loadTransport(type) {
    return fetch(this.getTransportUrl(type))
      .then((res) => {
        if (res.status === 200) {
          return res.text();
        } else {
          return Promise.reject(new Error(`Can't load information of transport type - ${type}`));
        }
      })
      .then((html) => {
        const $ = cheerio.load(html);
        const routes = $('table.table-st1')
          .first()
          .find('td.table-st1-border-left[align="center"]')
          .closest('tr')
          .map((index, elem) => ({
            num: $(elem).find('td b').text(),
            name: $(elem).find('td a').text(),
          }))
          .get();

        this.db[type] = routes;

        return Promise.all(routes.map((route) => this.loadStops(type, route)));
      });
  }


  load(type) {
    return this.loadTransport(type);
  }

}
