const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  title: String,
  user: String,
  column: Number,
  position: Number,
});

module.exports = Task;
