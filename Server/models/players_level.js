/*
  Level

*/

const level = require('level');
const db = level('./playersDB');

export default function DB() {
  return {
    get: db.get(key, (err, value) => {
      if (err) return console.log(`Ooops!: ${err}`);
      return value;
    }),
    put: db.put(key, value, (err) => {
      if (err) return console.log(`Ooops!: ${err}`);
      return;
    })
  }
}
