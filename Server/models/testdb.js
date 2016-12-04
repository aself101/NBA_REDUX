const User = require('./db');

const user = new User();

var testUser = {
  email: 'test2@test.com',
  password: 'password'
};
/*
user.encryptAndSave(testUser)
  .then((response) => console.log(response))
  .then(() => user.close())
  .catch((err) => console.error(err));
*/
/*
user.selectUser('test2@test.com')
  .then((response) => console.log(response[0].email))
  .then(() => user.close())
  .catch((err) => console.error(err));
*/
user.getPasswordAndCompare('test2@test.com', 'password')
  .then((isMatch) => {
    if (isMatch) {
      console.log('It is a match!');
    } else {
      console.log('It is not a match!')
    }
  })
  .then(() => user.close())
  .catch((err) => { console.error(err) });
