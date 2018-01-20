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

mongoose.connect(dbConfig.url, function (err) {
  if (err) console.log(error.message);
});
const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// ENTITIES ROUTING
const api = require('./routes/api');

// SET ALL ENTITY ROUTES TO /api
app.use('/api', api);

// EVERY OTHER REQUEST GOES TO THE ANGULAR APP
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`mađija na portu ${port}`.rainbow));