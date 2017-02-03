/*
  Main Server Setup
  10/26/2016

*/
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./router');
const spdy = require('spdy');
const fs = require('fs');


// App Setup
// Middleware: Any request will be piped into morgan and bodyParser
// Morgan: logging framework; outputs incoming request
// bodyParser: Parse incoming requests into json
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(helmet());
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Server Setup
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
/*
spdy
  .createServer(options, app)
  .listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`Server listening on http://localhost:${PORT}`);
  })*/

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});












































/* END */
