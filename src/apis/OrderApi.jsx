import Https from './https'; 
import { fTimeRange } from 'utils/formatTime.js';
class OrderApi extends Https {
  constructor() {
    super('order');
  }
}

export default new OrderApi();
