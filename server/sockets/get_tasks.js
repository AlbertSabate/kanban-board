const Task = require('../models/task');

module.exports = (socket) => {
  socket.on('get tasks', () => {
    Task.find({}, (err, docs) => {
      if (!err){
        return socket.emit('get tasks', {
          tasks: docs,
        });
      }

      return socket.emit('get tasks', {
        tasks: [],
      });
    });
  });
};
