const express = require('express');
const path = require('path');
const http = require('http');
var colors = require('colors');
const bodyParser = require('body-parser');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const dbConfig = require('../db/db.config');

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// ENTITIES ROUTING
const api = require('./routes/api');

// SET ALL ENTITY ROUTES TO /api
app.use('/api', api);

// EVERY OTHER REQUEST GOES TO THE ANGULAR APP
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

mongoose.connect(dbConfig.url).then(() => {
    const server = http.createServer(app);

    server.listen(port, () => console.log(`mađija na portu ${port}`.rainbow));
  },
  (err) => {
    console.log('   MONGO???   '.zebra);
  });