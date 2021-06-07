const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = 8080;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

io.on('connection', (socket) => {
    console.log('socket: ', socket.id, 'connected!');

    socket.on('send', (message) => {
        console.log('message is: ', message)
        io.emit('message', message)
    })
});