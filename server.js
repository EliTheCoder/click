"use strict";

const port = 80;

const express = require('express');
const path = require("path");
const app = express();
const util = require('util');
const eliapi = require('./eliapi.js');

let materials = {};

let clicks = 1;
materials.water = 0;
materials.earth = 0;
materials.fire = 0;
materials.air = 0;

app.use(express.static(path.join(__dirname, '/static')));

const server = app.listen(process.env.PORT || port, () => {
  eliapi.logMessage(0, "SERVER RUNNING: PORT: " + port);
});

const io = require('socket.io')(server);

io.on('connection', socket => {
  eliapi.logMessage(0, "CLIENT CONNECTED WITH IP ADDRESS: " + socket.request.connection.remoteAddress.split(':').slice(3)[0]);

  sUpdate(socket);

  socket.on('click', data => {
    click(data, socket);
  });

});

function randomItem() {
  let rItemNum = eliapi.random(1, 4);
  let rItemName = "";
  switch (rItemNum) {
    case 1:
      rItemName = "water";
      break;
    case 2:
      rItemName = "earth";
      break;
    case 3:
      rItemName = "fire";
      break;
    case 4:
      rItemName = "air";
      break;
  }
  return {num: rItemNum, name: rItemName};
}

function sUpdate(socket) {
  socket.broadcast.emit('click', clicks);
  socket.broadcast.emit('item', materials);
  socket.emit('click', clicks);
  socket.emit('item', materials);
}

function click(info, socket) {
  clicks++;
  let newItem = randomItem();
  materials[newItem.name]++;
  sUpdate(socket);
  eliapi.logMessage(0, `clicks: ${clicks} water: ${materials.water} earth: ${materials.earth} fire: ${materials.fire} air: ${materials.air}`);
}
