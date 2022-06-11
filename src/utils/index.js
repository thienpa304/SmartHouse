import { configMqtt } from 'constants';
export const convertToFeedKey = (keyId, username) => {
  Object.keys(keyId).forEach((key) => {
    keyId[key] = `${username}/feeds/${keyId[key]}`;
  });
  return keyId;
};

export const formatkey = (key) => {
  return `${configMqtt.username}/feeds/${key}`;
};
