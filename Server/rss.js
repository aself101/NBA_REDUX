const feed = require('feed-read');

const url = 'http://www.si.com/rss/si_nba.rss';





feed(url, (err, articles) => {
  if (err) throw new Error(err);
  console.log(articles);

});






/* END */
