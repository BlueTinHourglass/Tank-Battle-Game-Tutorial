var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}

// Basic code for an input handler to track when the WASD keys are pressed

document.addEventListener('keydown', function(event) {
  switch(event.keyCode) {
    case 65: // A
            movement.left = true;
            break;
    case 87: // W
            movement.up = true;
            break;
    case 68: // D
            movement.right = true;
            break;
    case 83: // S
            movement.down = true;
            break;
    }
});

document.addEventListener('keyup', function(event) {
  switch(event.keyCode) {
    case 65: // A
            movement.left = false;
            break;
    case 87: // W
            movement.up = false;
            break;
    case 68: // D
            movement.right = false;
            break;
    case 83: // S
            movement.down = false;
            break;
  }
})

// Alert the server that a new player has joined and create a loop to constantly send their keyboard input to the server
// This will send the keyboard state of this client 60 times a second to the server
socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 1000 / 60);

// handler to draw the data on the server to the HTML5 canvas
// Access the canvas and draws to it. Each time a 'state' message is received from the server, the client will clear the canvas and redraw all the players as a green circle on the canvas.
var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var context = canvas.getContext('2d');
socket.on('state', function(players) {
  context.clearRect(0, 0, 800, 600);
  context.fillStyle = 'green';
  for(var id in players) {
    var player = players[id];
    context.beginPath();
    context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
    context.fill();
  }
});
