const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// ENTITIES ROUTING
const api = require('./routes/api');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// SET ALL ENTITY ROUTES TO /api
app.use('/api', api);

// EVERY OTHER REQUEST GOES TO THE ANGULAR APP
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/dist/index'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));