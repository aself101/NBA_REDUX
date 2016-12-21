/*
  All Routes
*/
const Authentication = require('./controllers/authentication');
const { boxscores, player } = require('./controllers/nba_controller');
const passportService = require('./services/passport');

const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });





module.exports = (app) => {
  /* GETS */
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code abc123' });
  });
  app.get('/boxscores', requireAuth, boxscores);
  app.get('/player', requireAuth, player);

  /* POSTS */
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  /* UPDATES */

  /* DELETES */

  /*
  app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
  app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/feature',
                    failureRedirect : '/'
            }));
  */
}




































/* END */
