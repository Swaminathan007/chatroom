// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '\\public\\index.html');
});

io.on('connection', (socket) => {

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('chat message', `${username} joined the chat`);
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', `${socket.username}: ${msg}`);
  });

  socket.on('disconnect', () => {
    io.emit('chat message', `${socket.username} left the chat`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
