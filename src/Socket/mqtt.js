import mqtt from 'mqtt/dist/mqtt';

import { configMqtt } from 'constants';

const client = () => mqtt.connect('mqtts://io.adafruit.com', configMqtt);
client().on('error', (error) => {
  console.log('MQTT Client Errored');
  console.log(error);
});
export { client };
