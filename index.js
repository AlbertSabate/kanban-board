const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose');

const config = require('./server/config');
const router = require('./server/router')(express, app);
const socketIo = require('./server/socket')(io);

// DB connection
mongoose.connect(config.mongo);

// Server listener
server.listen(config.port, () => {
  console.log('Server listening at port %d', config.port);
});
