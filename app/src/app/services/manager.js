class ManagerService {
  constructor($rootScope, $window) {
    this.$rootScope = $rootScope;
    this.$window = $window;
    this.socket = io();
    this.alias = $window.sessionStorage.getItem('JAI_ALIAS');
    this.tasks = [];
  }

  setAlias(alias) {
    this.alias = alias;
    this.$window.sessionStorage.setItem('JAI_ALIAS', alias);

    this.$rootScope.$broadcast('set-alias');
  }

  getAlias() {
    return this.alias || '';
  }

  loadTasks() {
    return new Promise((resolve, reject) => {
      this.socket.emit('get tasks');
      this.socket.on('get tasks', (data) => {
        if (data.tasks) {
          return resolve(data.tasks);
        }

        return reject();
      });
    });
  }

  createTask(title) {
    return new Promise((resolve, reject) => {
      this.tasks = [
        ...this.tasks,
        {
          title: title,
          user: this.getAlias(),
          column: 1,
          position: (this.tasks.filter(task => task.column === 1).length + 1),
        }
      ];

      this.socket.emit('add task', this.tasks);
      this.socket.on('added task', (data) => {
        if (data.success) {
          return resolve();
        }

        return reject();
      });
    });
  }

  changeTasks(tasks) {
    return new Promise((resolve, reject) => {
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

      this.socket.emit('change task', this.tasks);
      this.socket.on('changed task', (data) => {
        if (data.success) {
          return resolve();
        }

        return reject();
      });
    });
  }

  setTasks(tasks) {
    this.tasks = tasks;
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
