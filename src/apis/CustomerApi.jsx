import Https from './https'; 
import { fTimeRange } from 'utils/formatTime.js';
class CustomerApi extends Https {
  constructor() {
    super('customer');
  }
  findMaxPrice = (params) => {
    return this.find(params, 'max-price')
  }
}

export default new CustomerApi();
