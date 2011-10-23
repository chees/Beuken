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
	io.sockets.emit('news', { hi: 'new'});
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function(data) {
		console.log(data);
	});
});

