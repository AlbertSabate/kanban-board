export const board = () => ({
  template: require('./board.html'),
  controller: 'BoardCtrl',
  controllerAs: 'board',
});

export class BoardCtrl {
  constructor($scope, manager) {
    this.url = 'https://github.com/preboot/angular-webpack';
    this.$scope = $scope;
    this.manager = manager;

    this.task = '';

    this.tasks = manager.getTasks();

    manager.loadTasks().then((tasks) => {
      manager.setTasks(tasks);

      this.tasks = manager.getTasks();
      this.$scope.$apply();
      toastr.success('Tasks loaded!');
    }).catch(() => {
      toastr.error('No tasks on board!');
    });

    this.boards = Object.keys(this.tasks);
    manager.socket.on('update tasks', (data) => {
      this.manager.setTasks(data.tasks);
      this.tasks = manager.getTasks();
      this.$scope.$apply();

      toastr.success('Updating tasks...');
    });
  }

  getName() {
    return this.manager.getAlias();
  }

  dropEnd() {
    this.manager.changeTasks(this.tasks).then(() => {
      this.tasks = this.manager.getTasks();
      this.$scope.$apply();

      toastr.success('Drag & Drop done');
    });
  }

  submit() {
    if (this.task !== '') {
      this.manager.createTask(this.task).then(() => {
        this.tasks = this.manager.getTasks();
        this.$scope.$apply();
      });
      this.task = '';

      return toastr.success('Order created!');
    }

    return toastr.error('Oppssss, something wrong!');
  }
}
