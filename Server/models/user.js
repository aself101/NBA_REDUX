/*******************************************************************************
MySQL class for database interaction
Alexander Self
11/2/16
Methods:
  connect(): connects to database
  end(): closes connection to database
  insertNewUser(): inserts new user
*******************************************************************************/
"use strict";
var con = require('./config');
const bcrypt = require('bcrypt-nodejs');

class User {
  constructor(con) {
    this.con = con;
  }

  connect() {
    return con.connect((err) => {
      if (err) {
        console.log("Error connecting to database");
        return;
      }
      console.log('Connected to MySQL');
    });
  }// end connect

  close() {
    return con.end((err) => {
      if (err) {
        console.log("Error closing database");
        return;
      }
      console.log('Closing connection.');
    });
  }// end close

  selectUser(email) {
    return new Promise(function(resolve, reject) {
      con.query(`SELECT email FROM user WHERE email='${email}'`, (err, row, fields) => {
        if (err) reject(err);
        resolve(row);
      });
    });
  }

  encryptAndSave(email, password) {
    const _this = this;
    return new Promise(function(resolve, reject) {
      // Create a salt to add to the password
      bcrypt.genSalt(10, function (err, salt) {
        if (err) reject(err);
        // Hash password with salt
        bcrypt.hash(password, salt, null, function (err, hash) {
          if (err) reject(err);

          password = hash;

          // Insert into database
          _this.insertNewUser(email, password, (err, result, fields) => {
            if (err) reject(err);
            resolve(result);
          });
        });
      });
    }); // end promise
  }

  getPasswordAndCompare(email, password) {
    return new Promise(function(resolve, reject) {
      con.query(`SELECT password FROM user WHERE email='${email}'`, (err, row, fields) => {
        if (err) reject(err);
          bcrypt.compare(password, row[0].password, function(err, isMatch) {
            if (err) reject(err);
            resolve(isMatch);
          });
      });
    });
  }

  // Insert single data point; args is an object of values; called in encryptAndSave
  insertNewUser(email, password, cb) {
    return con.query(`INSERT into user (email,password,ts) VALUES('${email}','${password}',CURRENT_TIMESTAMP())`, (err, result, fields) => {
      if (err) throw err;
      if (typeof cb === 'function') {
        cb(err, result, fields);
      } else {
        console.log("Please provide a callback function.");
        return;
      }
    });
  }

  // Delete single data point
  deleteData(email) {
    return new Promise(function(resolve, reject) {
      con.query(`DELETE FROM user WHERE email=${email}`, (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

}// end db

module.exports = User;
