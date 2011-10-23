var express = require('express');
var app = express.createServer();

app.use(express.static(__dirname + '/static'));

app.listen(8080);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/client.html');
});

app.get('/game', function(req, res) {
	res.sendfile(__dirname + '/game.html');
});


var io = require('socket.io').listen(app);

io.sockets.on('connection', function(socket) {
	// TODO give the player some id so it can be tracked by the game
	console.log('New player');
	socket.emit('msg', { hello: 'world' });
	//io.sockets.emit('news', { hi: 'new'});
	socket.on('dir', function(data) {
		console.log('dir ' + data);
		// TODO forward it to the game
	});
});

