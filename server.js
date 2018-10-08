/*

Click
Copyright (C) 2018 Eli Frigo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

"use strict";

const port = 80;

const express = require('express');
const path = require("path");
const app = express();
const util = require('util');
const eliapi = require('./eliapi.js');

let materials = {};

let clicks = 0;
materials.water = 0;
materials.earth = 0;
materials.fire = 0;
materials.air = 0;
materials.taurus = 0;
materials.aries = 0;
materials.gemini = 0;
materials.cancer = 0;
materials.leo = 0;
materials.libra = 0;
materials.scorpio = 0;
materials.virgo = 0;
materials.aquaries = 0;
materials.pisces = 0;
materials.capricorn = 0;
materials.sagittarius = 0;

app.use(express.static(path.join(__dirname, '/static')));

const server = app.listen(process.env.PORT || port, () => {
  eliapi.logMessage(0, "SERVER RUNNING: PORT: " + port);
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(text) {
  if (text.trim() === 'quit') {
    done();
  }
  try {
    eval(text.trim());
  } catch(err) {
    eliapi.logMessage(2, err.toString());
  }
});

function done() {
  console.log('Quiting..');
  process.exit();
}

const io = require('socket.io')(server);

io.on('connection', socket => {
  eliapi.logMessage(0, "CLIENT CONNECTED WITH IP ADDRESS: " + socket.request.connection.remoteAddress.split(':').slice(3)[0]);

  sUpdate(socket);

  socket.on('click', data => {
    click(data, socket);
  });

  socket.on('buy', data => {
    if (materials[data.element] > 0) {
      materials[data.element]--;
      materials[data.name]++;
      sUpdate(socket);
    }
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
  return {
    num: rItemNum,
    name: rItemName
  };
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
}

setInterval(() => {
  eliapi.logMessage(0, `clicks: ${clicks} water: ${materials.water} earth: ${materials.earth} fire: ${materials.fire} air: ${materials.air}`);
}, 30000);
