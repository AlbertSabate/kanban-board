class ManagerService {
  constructor($rootScope) {
    this.$rootScope = $rootScope;
    this.alias = '';
    this.tasks = [];
  }

  setAlias(alias) {
    this.alias = alias;

    this.$rootScope.$broadcast('set-alias');
  }

  getAlias() {
    return this.alias || '';
  }

  loadTasks() {
    return Promise.resolve();
  }

  createTask(title) {
    this.tasks = [
      ...this.tasks,
      {
        title: title,
        column: 1,
        position: (this.tasks.filter(task => task.column === 1).length + 1),
      }
    ];

    return Promise.resolve();
  }

  changeTasks(tasks) {
    let tasksList = Object.keys(tasks).map(col => tasks[col].map((task, i) => {
      task.position = i;
      switch(col) {
        case 'new':
          task.column = 1;
          break;
        case 'process':
          task.column = 2;
          break;
        default:
          task.column = 3;
      }

      return task;
    }));

    tasksList = [
      ...tasksList[0],
      ...tasksList[1],
      ...tasksList[2],
    ];

    this.tasks = tasksList;

    return Promise.resolve();
  }

  getTasks() {
    return {
      new: this.tasks.filter(task => task.column === 1).sort((a, b) => a.position - b.position),
      process: this.tasks.filter(task => task.column === 2).sort((a, b) => a.position - b.position),
      finished: this.tasks.filter(task => task.column === 3).sort((a, b) => a.position - b.position),
    };
  }
}

export default ManagerService;
