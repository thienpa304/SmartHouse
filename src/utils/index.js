export const convertToFeedKey = (keyId, username) => {
  Object.keys(keyId).forEach((key) => {
    keyId[key] = `${username}/feeds/${keyId[key]}`;
  });
  return keyId;
};

 