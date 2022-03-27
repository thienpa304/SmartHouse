import Https from './https'; 
import { fTimeRange } from '../utils/formatTime.js';
class MesureApi extends Https {
  constructor() {
    super('mesures');
  }
  findByKey(key, params, callback) { 
    
    this.findById(key, params)
      .then((res) => {
        const result = { labels: [], values: [] };
        res.forEach((el) => {
          result.values.push(Math.round(el.value));
          result.labels.push(fTimeRange(el.updated_at, params.filter));
        });
        return result;
      })
      .then((res) => {
        callback(res);
      });
  }
}

export default new MesureApi();
