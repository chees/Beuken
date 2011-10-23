var app = require('express').createServer();
var io = require('socket.io').listen(app);

app.listen(8080);

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {
	io.sockets.emit('news', { hi: 'new'});
	socket.emit('news', { hello: 'world' });
	socket.on('my other event', function(data) {
		console.log(data);
	});
});
