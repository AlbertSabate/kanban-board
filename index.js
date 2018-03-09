const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'app/dist')));

// Socket
io.on('connection', (socket) => {
  socket.on('get tasks', () => {
    // @TODO Get tasks with mongoose

    socket.emit('get tasks', {
      tasks: socket.tasks,
    });
  });

  socket.on('add task', (tasks) => {
    socket.tasks = tasks;

    // @TODO Save tasks with mongoose

    socket.emit('added task', {
      success: true,
    });

    socket.broadcast.emit('update tasks', {
      tasks: socket.tasks,
    });
  });

  socket.on('change task', (tasks) => {
    socket.tasks = tasks;

    // @TODO Save tasks with mongoose

    socket.emit('changed task', {
      success: true,
    });

    socket.broadcast.emit('update tasks', {
      tasks: socket.tasks,
    });
  });
});
