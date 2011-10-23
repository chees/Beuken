var lastDir = 0;
var mouseDown = false;
var dpad = document.getElementById('dpad');
var socket = io.connect('http://localhost');


function sendDirection(dir) {
	if (lastDir == dir) return;
	lastDir = dir;
	console.log('dir '+dir);
	socket.emit('dir', dir);
}

function handleEvent(e) {
	e.preventDefault();
	var offset = $(dpad).offset();
	var size = $(dpad).width();
	var x, y;
	if(e.touches) {
		x = e.touches[0].pageX - offset.left;
		y = e.touches[0].pageY - offset.top;
	} else {
		x = e.pageX - offset.left;
		y = e.pageY - offset.top;
	}
	if(x > y) {
		if(x + y < size) {
			sendDirection(1); // up
		} else {
			sendDirection(2); // right
		}
	} else {
		if(x + y > size) {
			sendDirection(3); // down
		} else {
			sendDirection(4); // left
		}
	}
}

function handleMsg(data) {
	// TODO
	console.log(data);
}

function init() {
	if(typeof(document.ontouchmove) != 'undefined') {
		// Doesn't seem to work when using JQuery bind:
		dpad.addEventListener('touchstart', handleEvent, false);
		dpad.addEventListener('touchmove', handleEvent, false);
	} else {
		$('#dpad').bind('mousedown', function(e) {
			mouseDown = true;
			handleEvent(e);
		});
		$('#dpad').bind('mousemove', function(e) {
			if(mouseDown) handleEvent(e);
		});
		$('#dpad').bind('mouseup', function(e) {
			mouseDown = false;
		});
	}

	socket.on('msg', handleMsg);
}

init();

