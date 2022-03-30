import { convertToFeedKey } from "utils"

 
export const configMqtt = {
  username: 'hoductri',
  password: 'aio_xRqU98GzplvtCz1BO8gBrNpl9axX',
  port: '443',
  url: 'mqtts://io.adafruit.com'
};
export const feeds = {
  firstLed: 'bbc-led',
  temperature: 'bbc-temp',
  moisture: 'bbc-moisture',
  gas: 'bbc-gas',
  secondLed: 'bbc-led2',
  door: 'bbc-door',
  pump: 'bbc-pump'
};
export const NAME_DEVICES = {
  firstLed: 'Light 1',
  temperature: 'Temperature',
  moisture: 'Moisture',
  gas: 'Gas',
  secondLed: 'Light 2',
  door: 'Door ',
  pump: 'Pump'
};

export const keyId = convertToFeedKey(feeds,configMqtt.username)

export const OPTIONS_REPEATS_CHEDULE = [ 
  { label: 'Every Days', value:'0'},
  { label: 'Monday', value:'1'},
  { label: 'Tuesday', value:'2'},
  { label: 'Wednesday', value:'3'},
  { label: 'Thursday', value:'4'},
  { label: 'Friday', value:'5'},
  { label: 'Saturday', value:'6'},
  { label: 'Sunday', value:'7'}
]

export const TABLE_HEAD_SCHEDULES = [
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'repeat', label: 'Repeat', alignRight: false },
  { id: 'updated', label: 'Updated At', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'active', label: 'Active', alignRight: false },
  { id: '' }
];

