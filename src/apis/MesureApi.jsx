import Https from './https';
import { format } from 'date-fns';
class MesureApi extends Https {
  constructor() {
    super('mesures');
  }
  findByKey(key, params, callback) {
    this.findById(key, params)
      .then((res) => {
        const result = {labels: [], values: []};
        res.map((el) => {
          result.values.push(el.value)
          result.labels.push(format(new Date(el.updated_at), 'hh:mm:ss'))
        });
        return result
      })
      .then((res) => {
        callback(res);
      });
  }
}

export default new MesureApi();
