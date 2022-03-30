import Https from './https';

import { OPTIONS_REPEATS_CHEDULE } from 'constants';
import { fDateTime } from 'utils/formatTime'
class ScheduleApi extends Https {
  constructor() {
    super('schedules');
  }
  getByKey(key) {
    return this.findById(key).then((res) => ({
      total: res.total,
      items: res.items.map((el) => { 
        const repeat =  el.repeat.split(',').map(day=>{
          if(el.repeat.length < 2) return  OPTIONS_REPEATS_CHEDULE.find((el) => el.value === day)?.label;
          
          return OPTIONS_REPEATS_CHEDULE.find((el) => el.value === day)?.label.substring(0,3);
        })
        const updatedAt = fDateTime(new Date(el.updated_at)) 
        return {
          startTime: el.start_time,
          active: el.active,
          status: el.status,
          repeat: repeat.join(', '),
          updatedAt,
          _id: el._id
        };
      })
    }));
  }

}

export default new ScheduleApi();
