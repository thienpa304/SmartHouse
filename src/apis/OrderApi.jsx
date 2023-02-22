import Https from './https';
class OrderApi extends Https {
  constructor() {
    super('order');
  }
}

export default new OrderApi();
