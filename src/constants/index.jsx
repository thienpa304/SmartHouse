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

export const keyId = convertToFeedKey(feeds,configMqtt.username)

export const optionsRepeatSchedule = [
  { label: 'One times', value:'1'},
  { label: 'Every Days', value:'0'},
  { label: 'Monday', value:'2'},
  { label: 'Tuesday', value:'3'},
  { label: 'Wednesday', value:'4'},
  { label: 'Thursday', value:'5'},
  { label: 'Friday', value:'6'},
  { label: 'Saturday', value:'7'},
  { label: 'Sunday', value:'8'}
]

export const TABLE_HEAD_SCHEDULES = [
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'repeat', label: 'Repeat', alignRight: false },
  { id: 'rest', label: 'Rest', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'active', label: 'Active', alignRight: false },
  { id: '' }
];