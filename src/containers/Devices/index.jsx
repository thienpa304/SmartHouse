import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Socket from '../../Socket'
import CardDevice from '../../components/CardDevice';

const Device = (props) => {
  const [checkedLight, setCheckedLight] = useState(true);
  const [checkedLightOne, setCheckedLightOne] = useState(true);
  const [checkedDoor, setCheckedDoor] = useState(false);
  const [checkedPump, setCheckedPump] = useState(false);
  // const [checkedTemperature, setCheckedTemperature] = useState(true); 
  useEffect(() => {  
    Socket.comsumer('helloThien/f/bbc-led',(data) => {
      setCheckedLight(Boolean(Number(data)));
    })  
  }, []);
  const handleChangeCheckedLight = (event) => {
    setCheckedLight(event.target.checked);
    Socket.publish('helloThien/f/bbc-led',Number(event.target.checked).toString());
  };
  const handleChangeCheckedDoor = (event) => {
    setCheckedDoor(event.target.checked);
    // code
  };
  const handleChangeCheckedPump = (event) => {
    setCheckedPump(event.target.checked);
    // code
  };
  const handleChangeCheckedLightOne = (event) => {
    setCheckedLightOne(event.target.checked);
    // code
  };
  // const handleChangeCheckedTemperature = (event) => {
  //   setCheckedTemperature(event.target.checked);
  //   // code
  // };
  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <CardDevice
          title="Light 1"
          icon="carbon:light"
          checked={checkedLight}
          onChange={handleChangeCheckedLight}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDevice
          title="Door"
          icon="bi:door-open"
          checked={checkedDoor}
          onChange={handleChangeCheckedDoor}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDevice
          title="Pump"
          icon="mdi:water-pump"
          checked={checkedPump}
          onChange={handleChangeCheckedPump}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <CardDevice
          title="Light 2 "
          icon="carbon:light"
          checked={checkedLightOne}
          onChange={handleChangeCheckedLightOne}
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={3}>
        <CardDevice
          title="Temperature"
          icon="la:temperature-low"
          checked={checkedTemperature}
          onChange={handleChangeCheckedTemperature}
        />
      </Grid> */}
    </>
  );
};

export default Device;
