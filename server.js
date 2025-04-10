var static = require('node-static');
var http = require('http');

const PORT = 1234

var file = new(static.Server)();

var app = http.createServer(function (req, res) {
	file.serve(req, res);
}).listen(PORT);

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
	socket.on('message', function (message) {
		console.log('Got message: ', message);
		socket.broadcast.emit('message', message); // should be room only
	});

	socket.on('create or join', function (room) {
		var numClients = io.sockets.clients(room).length;

		console.log('Room ' + room + ' has ' + numClients + ' client(s)');
		console.log('Request to create or join room', room);

		if(numClients == 0) {
			socket.join(room);
			socket.emit('created', room);
		}

		else if(numClients == 1) {
			io.sockets.in(room).emit('join', room);
			socket.join(room);
			socket.emit('joined', room);
		}

		else { // max two clients
			socket.emit('full', room);
		}

		socket.emit('emit(): client ' + socket.id + ' joined room ' + room);
		socket.broadcast.emit('broadcast(): client ' + socket.id + ' joined room ' + room);
	});
});

console.log(`Server running at http://127.0.0.1:${PORT}/`);