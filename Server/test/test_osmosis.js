
// All headers
var h = [];
// All picks
var p = [];

// Main function to pull all values
function getTank() {
  // Pull headers
  var headers = new Promise(function(resolve, reject) {
    osmosis
      .get('http://www.tankathon.com/')
      .find('table > tr.headers > td')
      .set('headers')
      .data(function(d) {
        h.push(d);
        resolve(h);
      })
      .log(console.log)
      .error(console.log)
      .debug(console.log);
  });
  // Pull table body
  var body = new Promise(function(resolve, reject) {
    osmosis
      .get('http://www.tankathon.com/')
      .find('table > tr.pick-row > td')
      .set('row-picks')
      .data(function(d) {
        p.push(d);
        resolve(p);
      })
      .log(console.log)
      .error(console.log)
      .debug(console.log);
  });

  return {
    headers: headers,
    body: body
  };
}


var tank = getTank();
var re = /[A-Z]/;
/*
tank.headers.then((vals) => {
  for (let key of vals) {
    if (key['headers'] === '') vals.pop();
  }
  console.log(vals);
});
*/

function cleanUpTankathon(vals) {
  var tankathonArray = [];
  var tankObj = {};
  for (let i = 0; i < vals.length; i++) {
    if (i % 9 === 0) {}
    else {
      tankObj.team = vals[i]['row-picks'];
      i++;
      tankObj.record = vals[i]['row-picks'];
      i++;
      tankObj.winPct = vals[i]['row-picks'];
      i++;
      tankObj.gb = vals[i]['row-picks'];
      i++;
      tankObj.streak = vals[i]['row-picks'];
      i++;
      tankObj.l10 = vals[i]['row-picks'];
      i++;
      tankObj.top3 = vals[i]['row-picks'];
      i++;
      tankObj.num1Ovr = vals[i]['row-picks'];
      i++;
      tankathonArray.push(tankObj);
      tankObj = {};
    }
  }
  return tankathonArray;
}

tank.body.then((vals) => {
  // Push new objects into array as they are cleaned up
  var arr = cleanUpTankathon(vals);
  console.log(arr);
});























/* END */
