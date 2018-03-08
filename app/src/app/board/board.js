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

    manager.loadTasks().then(() => {
        this.tasks = manager.getTasks();
    });

    this.boards = Object.keys(this.tasks);
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
