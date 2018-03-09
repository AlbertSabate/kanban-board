const Task = require('../models/task');

module.exports = (socket) => {
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
};
