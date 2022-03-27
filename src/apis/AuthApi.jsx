import Https from './https';

class AuthApi extends Https {
  constructor() {
    super('auth');
  }
  login = (data) => {
    this.setSubUri('login');
    return this.create({ password: data.password, username: data.email }).then((res) => { 
      localStorage.setItem('access_token', res.access_token);
      return { 
        message: res.message
      };
    });
  };
}

export default new AuthApi();
