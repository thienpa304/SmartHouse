import { Grid } from '@mui/material'
import CardDevice from 'components/CardDevice'
import { DEVICES, URL_API_ADAFRUIT } from 'constants'
import React, { useEffect, useState } from 'react'
import { formatkey } from 'utils'
import Socket from '../../Socket'

const Device = (props) => {
  const [listDevices, setListDevices] = useState([]);
  useEffect(() => {
    DEVICES.filter((item) => item.type === 'button').forEach(async ({ key, name, icon, index }) => {
      const res = await fetch(`${URL_API_ADAFRUIT}${formatkey(key)}`);
      let data = await res.json();
      setListDevices((listDevices) => [
        ...listDevices,
        {
          value: !Boolean(Number(data.last_value) % 2),
          key: formatkey(key),
          name: name,
          index,
          icon
        }
      ]);
      Socket.comsumer(formatkey(key), (data) => {
        setListDevices((preValue) =>
          [...preValue].map((el) => {
            if (el.key === formatkey(key)) el.value = !Boolean(Number(data) % 2);
            return el;
          })
        );
      });
    });
  }, []);
  const handleChangeListDevice = (key, index) => (event) => {
    Socket.publish(key, (Number(!event.target.checked) + index * 2).toString());
  };
  return (
    <>
      {listDevices.map((device) => (
        <Grid key={device.key} item xs={12} sm={6} md={3}>
          <CardDevice
            title={device.name}
            icon={device.icon}
            linkTo={device.key.split('/').join('_')}
            checked={device.value}
            onChange={handleChangeListDevice(device.key, device.index)}
          />
        </Grid>
      ))}
    </>
  );
};

export default Device;
