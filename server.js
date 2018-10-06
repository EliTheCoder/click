"use strict";

const port = 8080;

const express = require('express');
const path = require("path");
const app = express();
const util = require('util');

let clicks = 0;

function logMessage(type, message) {
  let typeString;
  switch (type) {
    case 0:
      typeString = "INFO";
      break;
    case 1:
      typeString = "WARNING";
      break;
    case 2:
      typeString = "ERROR";
      break;
    default:
      typeString = "LOG";
  }
  let datestamp = "";
  datestamp += new Date();
  console.log(`[${typeString.toUpperCase()}] {${datestamp.toUpperCase()}} ${message.toUpperCase()}`);
}

app.use(express.static(path.join(__dirname, '/static')));

const server = app.listen(process.env.PORT || port, () => {
  logMessage(0, "SERVER RUNNING: PORT: " + port);
});

const io = require('socket.io')(server);

io.on('connection', socket => {
  logMessage(0, "CLIENT CONNECTED WITH IP ADDRESS: " + socket.request.connection.remoteAddress.split(':').slice(3)[0]);

  socket.emit('click', clicks);

  socket.on('click', data => {
    clicks++;
    socket.broadcast.emit('click', clicks);
  });

});

setTimeout(() => {
  logMessage(0, "clients connected: " + clients);
}, 60000);
