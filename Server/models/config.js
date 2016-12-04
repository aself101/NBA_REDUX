const mysql = require('mysql');

module.exports = mysql.createConnection({
  host: 'localhost',
  user: 'authuser',
  password: 'authpass',
  database: 'auth'
});




















/* END */
