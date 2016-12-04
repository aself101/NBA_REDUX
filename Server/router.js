/*
  All Routes
*/
const Authentication = require('./controllers/authentication');
const { boxscores } = require('./controllers/nba_controller');
const passportService = require('./services/passport');

const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });





module.exports = (app) => {
  app.get('/', requireAuth, function(req, res) {
    res.send({ message: 'Super secret code abc123' });
  });
  app.get('/profile', requireAuth, boxscores);
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

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
