const socket = io();

let clicks = 0;
let materials = {};

function clickit() {
  clicks++;
  update();
  socket.emit("click");
}

function buyMaterial(name, element) {
  socket.emit("buy", {name: name, element: element});
}

socket.on("click", data => {
  if (!isNaN(data) && data >= 0) {
    clicks = data;
    update();
  }
});

socket.on("item", data => {
  materials = data;
  update();
});

function update() {
  document.getElementById("button").innerHTML = clicks;
  document.getElementById("water").innerHTML =       materials.water;
  document.getElementById("earth").innerHTML =       materials.earth;
  document.getElementById("fire").innerHTML =        materials.fire;
  document.getElementById("air").innerHTML =         materials.air;
  document.getElementById("taurus").innerHTML =      materials.taurus;
  document.getElementById("aries").innerHTML =       materials.aries;
  document.getElementById("gemini").innerHTML =      materials.gemini;
  document.getElementById("cancer").innerHTML =      materials.cancer;
  document.getElementById("leo").innerHTML =         materials.leo;
  document.getElementById("libra").innerHTML =       materials.libra;
  document.getElementById("scorpio").innerHTML =     materials.scorpio;
  document.getElementById("virgo").innerHTML =       materials.virgo;
  document.getElementById("aquaries").innerHTML =    materials.aquaries;
  document.getElementById("pisces").innerHTML =      materials.pisces;
  document.getElementById("capricorn").innerHTML =   materials.capricorn;
  document.getElementById("sagittarius").innerHTML = materials.sagittarius;
}
