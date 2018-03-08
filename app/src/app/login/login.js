export const login = () => ({
  template: require('./login.html'),
  controller: 'LoginCtrl',
  controllerAs: 'login',
});

export class LoginCtrl {
  constructor(manager) {
    this.alias = '';
    this.manager = manager;
    this.submit = this.submit;
  }

  setAlias(alias) {
    this.manager.setAlias(alias);
  }

  submit() {
    if (this.alias !== '') {
      return this.setAlias(this.alias);
    }

    return toastr.error('empty alias not allowed');
  }
}
