const socket = io();

let clicks = 0;

socket.on("click", data => {
  if (data) {
    clicks = data;
    document.getElementById("button").innerHTML = clicks;
  }
});
