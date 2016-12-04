const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(email) {
  // Sub: subject, iat: issued at time
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: email, iat: timestamp }, config.secret);
}


exports.signup = (req, res, next) => {
  // See if a user exists
  const email = req.body.email;
  const password = req.body.password;
  const user = new User();

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }

  user.selectUser(email)
    .then((existingUser) => {
      if (existingUser.length > 0) {
        res.status(422).send({error: 'Email is in use'});
      }
    }).catch((err) => { return next(err); });

  user.encryptAndSave(email, password)
    .then((result) => {
      res.json({ token: tokenForUser(email) });
    }).catch((err) => { return next(err); });
}

exports.signin = (req, res, next) => {
  // User has already given email, now give token

  res.send({ token: tokenForUser(req.body.email) });
}





















/* END */
