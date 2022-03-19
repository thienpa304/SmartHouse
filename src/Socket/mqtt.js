import mqtt from 'mqtt/dist/mqtt';

const options = {
  username: 'helloThien',
  password: 'aio_wjjv27p5Gashu8dxfkzVQ3CpuhhS',
  port: '443'
};

const client = () => mqtt.connect('mqtts://io.adafruit.com', options);
client().on('error', (error) => {
  console.log('MQTT Client Errored');
  console.log(error);
});
export { client };
