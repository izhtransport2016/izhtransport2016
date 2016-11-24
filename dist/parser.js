function getUrl(type, num) {
  var rnd = Math.round(Math.random() * 10000);
  var mode = (type === 'bus' ? 1 : (type === 'trol' ? 2 : 4));

  return 'http://igis.ru/com/gortrans/page/online.php?nom='
   + num + '&mode=' + mode + '&rnd=' + rnd;
}

function getParsedResultJSON(text) {
  var reStation = /data-station=(\d+).*?<small.*?>(\d+?)/g;
  var reTransport = /data-station=(\d+).*?sprite sprites(\d+).*?napr="(\d+)".*?title="(.+?)"/g;
  var stations = [];
  var transports = [];
  var result;

  while (result = reStation.exec(text)) {
    stations.push({
      id: result[1],
      time: result[2]
    });
  }

  while (result = reTransport.exec(text)) {
    transports.push({
      stationId: result[1],
      status: ['7', '10'].indexOf(result[2]) < 0 ? 'move' : 'stay',
      direction: result[3] == 1 ? 'direct' : 'reverse',
      title: result[4]
    });
  }

  return JSON.stringify({
    stations: stations,
    transports: transports
  });
}