import Https from './https';
class CustomerApi extends Https {
  constructor() {
    super('customer');
  }
  findMaxPrice = (params) => {
    return this.find(params, 'max-price');
  };
}

export default new CustomerApi();
