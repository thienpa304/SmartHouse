import mqtt from 'mqtt/dist/mqtt';

const options = {
  username: 'hoductri',
  password: 'aio_EUQX952NvvPAbPKxVayxoNh6TSDY',
  port: '443'
};

const client = () => mqtt.connect('mqtts://io.adafruit.com', options);
client().on('error', (error) => {
  console.log('MQTT Client Errored');
  console.log(error);
});
export { client };
