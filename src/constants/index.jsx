import { convertToFeedKey } from 'utils';

export const URL_API_ADAFRUIT = 'https://io.adafruit.com/api/v2/';

export const configMqtt = {
  username: 'hoductri',
  password: 'aio_faXm32joXt8Q31fhg1t1Mx8eBwe0',
  port: '443'
};
export const feeds = {
  temperature: 'bbc-temp',
  moisture: 'bbc-moisture',
  gas: 'bbc-gas'
};

export const DEVICES = [
  {
    key: 'bbc-led',
    icon: 'carbon:light',
    name: 'Light',
    type: 'button',
    index: 0
  },
  {
    key: 'bbc-buzzer',
    icon: 'ant-design:notification-outlined',
    name: 'Buzzer',
    type: 'button',
    index: 1
  },
  {
    key: 'bbc-door',
    icon: 'bi:door-open',
    name: 'Door',
    type: 'button',
    index: 2
  },
  // {
  //   key: 'bbc-pump',
  //   icon: 'mdi:water-pump',
  //   name: 'Pump',
  //   type: 'button'
  // },
  {
    name: 'Temperature',
    unit: '°C',
    key: 'bbc-temp',
    color: 'green',
    type: 'chart'
  },
  // {
  //   key: 'bbc-moisture', 
  //   name: 'Moisture',
  //   type: 'chart',
  //   unit: '%',
  //   color: 'violet',
  // },
  {
    key: 'bbc-gas', 
    name: 'Gas',
    type: 'chart',
    unit: 'ppm',
    color: 'yellow',
  },
  {
    key: 'bbc-humi', 
    name: 'Humidity',
    type: 'chart',
    unit: '%',
    color: 'red',
  }
];

export const keyId = convertToFeedKey(feeds, configMqtt.username);
export const OPTIONS_REPEATS_CHEDULE = [
  { label: 'Every Days', value: '0' },
  { label: 'Monday', value: '1' },
  { label: 'Tuesday', value: '2' },
  { label: 'Wednesday', value: '3' },
  { label: 'Thursday', value: '4' },
  { label: 'Friday', value: '5' },
  { label: 'Saturday', value: '6' },
  { label: 'Sunday', value: '7' }
];

export const TABLE_HEAD_SCHEDULES = [
  { id: 'time', label: 'Time', alignRight: false },
  { id: 'repeat', label: 'Repeat', alignRight: false },
  { id: 'updated', label: 'Updated At', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'active', label: 'Active', alignRight: false },
  { id: '' }
];
