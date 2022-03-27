import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import SelectVariants from '../../components/SelectVariants';
import ChartView from '../../components/ChartView';
import { keyId } from '../../constants';
import { MesureApi } from '../../apis';

const Moisture = (props) => {
  const theme = useTheme();
  const [selectDate, setSelectDate] = useState('2017-01-01');
  const [timeRange, setTimeRange] = useState(5);
  const [data, setData] = useState({
    name: 'Moisture',
    type: 'area',
    unit: '%',
    data: [],
    labels: []
  });
  useEffect(() => { 
    MesureApi.findByKey(
      'key',
      {
        keyId: keyId.moisture,
        filter: timeRange,
        sort: 'updated_at',
        offset: 0,
        limit: 20
      },
      (res) => {
        setData((state) => ({ ...state, ...res }));
      }
    );
  }, [timeRange]);

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
          title="Moisture"
          subheader="Range per 5 second (%)"
          color={theme.palette.chart.violet[0]}
        />
      </Grid>
    </>
  );
};

export default Moisture;
