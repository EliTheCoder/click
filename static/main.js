const socket = io();

let clicks = 0;
let materials = {};

function clickit() {
  clicks++;
  update();
  socket.emit('click');
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
  document.getElementById("water").innerHTML = materials.water;
  document.getElementById("earth").innerHTML = materials.earth;
  document.getElementById("fire").innerHTML = materials.fire;
  document.getElementById("air").innerHTML = materials.air;
}
