import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ChartView from '../../components/ChartView';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SelectVariants from '../../components/SelectVariants';

import { MesureApi } from '../../apis';

const Temperature = (props) => {
  const [selectDate, setSelectDate] = useState('2017-01-01');
  const [timeRange, setTimeRange] = useState(1);
  const [data, setData] = useState({
    name: 'Temperature',
    type: 'area',
    unit: '°C',
    data: [],
    labels: []
  }); 
  

  useEffect(() => {
    MesureApi.findByKey(
      'key',
      {
        keyId: 'hoductri/feeds/bbc-temp',
        filter: 5,
        sort: 'updated_at',
        offset: 0,
        limit: 20
      },
      (res) => {
        setData(state=>({...state,...res}));
        setInterval(() => {
          const newData = {...res};
          newData.values.push(newData.values[0]);
          newData.values.shift();
          newData.labels.push(newData.labels[0]);
          newData.labels.shift();
          setData(state=>({ ...state,...newData }));
        }, 2000);
      }
    );
  }, []);
  const renderActions = (
    <div>
      <SelectVariants
        value={timeRange}
        label="Range"
        handleChange={(event) => {
          setTimeRange(event.target.value);
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Select Date"
          value={selectDate}
          minDate={new Date('2017-01-01')}
          onChange={(newValue) => {
            setSelectDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
  return (
    <>
      <Grid item xs={12} md={12} lg={12}>
        <ChartView
          action={renderActions}
          data={data}
        />
      </Grid>
    </>
  );
};

export default Temperature;
