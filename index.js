const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('../..')(server);
const port = process.env.PORT || 3000;

// @TODO Add mongoose

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'app/dist')));

// Socket
io.on('connection', (socket) => {
  socket.on('add task', (tasks) => {
    socket.tasks = tasks;

    socket.emit('added', {
      success: true,
    });

    socket.broadcast.emit('added task', {
      tasks: socket.tasks
    });
  });

  socket.on('change task', (tasks) => {
    socket.emit('changed', {
      success: true,
    });

    socket.broadcast.emit('change task', {
      tasks: tasks,
    });
  });
});
