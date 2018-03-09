const getTasks = require('./sockets/get_tasks');
const createTasks = require('./sockets/create_tasks');
const changeTasks = require('./sockets/change_tasks');

module.exports = (io) => {
  io.on('connection', (socket) => {
    getTasks(socket);
    createTasks(socket);
    changeTasks(socket);
  });
};
