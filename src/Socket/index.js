import { client } from './mqtt';

class Socket {
  client;
  constructor() {
    this.client = client();
  }
  comsumer = (key, callback) => {
    this.client.subscribe(key, (err) => {
      if (err) throw err;
    });
    this.client.on('message', function (topic, message) {
      const mssg = message.toString();
      if (topic === key) callback(mssg);
    });
  };

  publish = (key, data) => {
    this.client.subscribe(key, (err) => {
      if (err) throw err;
    });
    this.client.publish(key, data);
  };
}

export default new Socket();
