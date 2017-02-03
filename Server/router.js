/*
  All Routes
*/
const Authentication = require('./controllers/authentication');
const { boxscores, player, standings, tankathon,
  boxscoresInfo, team, news } = require('./controllers/nba_controller');
const passportService = require('./services/passport');

const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });





module.exports = (app) => {
  /* GETS */
  app.get('/boxscores', requireAuth, boxscores);
  app.get('/boxscoresInfo', requireAuth, boxscoresInfo);
  app.get('/player', requireAuth, player);
  app.get('/team', requireAuth, team);
  app.get('/standings', requireAuth, standings);
  app.get('/tankathon', requireAuth, tankathon);
  app.get('/news', requireAuth, news);
  /* POSTS */
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);

  /* UPDATES */

  /* DELETES */

}




































/* END */
