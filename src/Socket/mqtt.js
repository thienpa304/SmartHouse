import mqtt from 'mqtt/dist/mqtt';

const options = {
  username: 'hoductri',
  password: 'aio_ZhpF70RDQSfcNlPKTdP5jT70ejjp',
  port: '443'
};

const client = () => mqtt.connect('mqtts://io.adafruit.com', options);
client().on('error', (error) => {
  console.log('MQTT Client Errored');
  console.log(error);
});
export { client };
