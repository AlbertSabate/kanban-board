import angular from 'angular';
import dndLists from 'angular-drag-and-drop-lists';

import { login, LoginCtrl } from './login/login';
import { board, BoardCtrl } from './board/board';

import ManagerService from './services/manager';

import '../style/app.css';

const app = () => ({
  template: require('./app.html'),
  controller: 'AppCtrl',
  controllerAs: 'app'
});

class AppCtrl {
  constructor($scope, manager) {
    this.isBoard = (manager.getAlias() !== '') ? true : false;

    $scope.$on('set-alias', () => {
      this.isBoard = (manager.getAlias() !== '') ? true : false;
    });
  }
}

angular.module('app', [
  'dndLists',
])
  .controller('AppCtrl', AppCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('BoardCtrl', BoardCtrl)
  .directive('board', board)
  .directive('app', app)
  .directive('login', login)
  .service('manager', ManagerService);

export default 'app';
