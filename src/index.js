import { Loader } from './Loader';
import { TRANSPORT_TYPE_BUS, TRANSPORT_TYPE_TROL, TRANSPORT_TYPE_TRAM } from './Loader';
import fs from 'fs';
import path from 'path';

const db = {};
const loader = new Loader(db);

const distFolder = path.join(path.dirname(__filename), './../dist/');

Promise.all([
    loader.load(TRANSPORT_TYPE_BUS),
    loader.load(TRANSPORT_TYPE_TROL),
    loader.load(TRANSPORT_TYPE_TRAM),
  ])
  .then(() => {
    return new Promise((resolve, reject) => {
      fs.writeFile(distFolder + 'db.json', JSON.stringify(db), (err) => {
        if (err) {
          reject(err);
        } else {
          const settings = {
            dbUpdateTime: Date.now()
          };

          fs.writeFile(distFolder + 'settings.json', JSON.stringify(settings), (err) => {
            resolve();
          });
        }
      });
    });
  })
  .then(() => {
    console.log('done');
  })
  .catch((err) => {
    process.exitCode = 1;
    console.error('fail');
    console.log(err);
  });
