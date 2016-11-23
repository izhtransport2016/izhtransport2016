// var type = 'bus';
// var num = 40;
// var rnd = round(Math.random() * 10000);

// var url = 'http://igis.ru/com/gortrans/page/online.php?nom='
//   + num + '&mode=' + (type === 'bus' ? 1 : (type === 'trol' ? 2 : 4)) + '&rnd=' + rnd;

// fetch(url).then(function (res) { return res.text() }).then(function (res) { var res = res })
// var regexp = /data-station=(\d+).*?<small.*?>(\d+?)/g;
// var stations = [];
// var result;

// while (result = regexp.exec(s)) {
//   stations.push({ id: result[1], time: result[2] });
// }

// var regexp = /data-station=(\d+).*?sprite sprites(\d+).*?napr="(\d+)".*?title="(.+?)"/g;
// var transports = [];

// while (result = regexp.exec(s)) {
//   transports.push({
//     stantionId: result[1],
//     status: ['7', '10'].indexOf(result[2]) < 0 ? 1 : 0,
//     direction: result[3],
//     title: result[4]
//   });
// }

// console.log(JSON.stringify(transports));