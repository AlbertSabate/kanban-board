const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

// Mongoose connection
mongoose.connect('mongodb://localhost/jumper-ai');

// Mongoose Model
const Task = mongoose.model('Task', {
  title: String,
  user: String,
  column: Number,
  position: Number,
});

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'app/dist')));

// Socket
io.on('connection', (socket) => {
  socket.on('get tasks', () => {
    Task.find({}, (err, docs) => {
      if (!err){
        socket.emit('get tasks', {
          tasks: docs,
        });

        return true;
      }

      throw err;
    });
  });

  socket.on('add task', (tasks) => {
    socket.tasks = tasks;

    Task.remove({}, () => {
      const tasks = socket.tasks.map(task => new Task({
        title: task.title,
        user: task.user,
        column: task.column,
        position: task.position,
      }));

      Task.collection.insert(tasks)
        .then((data) => {
          socket.emit('added task', {
            success: true,
          });

          socket.broadcast.emit('update tasks', {
            tasks: socket.tasks,
          });
        });
    });
  });

  socket.on('change task', (tasks) => {
    socket.tasks = tasks;
    Task.remove({}, () => {
      const tasks = socket.tasks.map(task => new Task({
        title: task.title,
        user: task.user,
        column: task.column,
        position: task.position,
      }));

      Task.collection.insert(tasks)
        .then((data) => {
          socket.emit('changed task', {
            success: true,
          });

          socket.broadcast.emit('update tasks', {
            tasks: socket.tasks,
          });
        });
    });
  });
});
