import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import SelectVariants from '../../components/SelectVariants';
import ChartView from '../../components/ChartView';

const Concentration = (props) => {
  const theme = useTheme();
  const [selectDate, setSelectDate] = useState('2017-01-01');
  const [timeRange, setTimeRange] = useState(1);
  const dataTemplate = [
    {
      name: 'Concentration',
      type: 'area',
      data: [44, 55, 431, 67, 22, 43, 21, 41, 56, 27, 43]
    }
  ]; 
  const renderActions = (
    <div>
      <SelectVariants
        value={timeRange}
        defaultValues={[
          { value: 1, name: '5 Seconds' },
          { value: 2, name: '1 Minute' },
          { value: 3, name: '1 Hour' }
        ]}
        label="Range"
        handleChange={(event) => {setTimeRange(event.target.value)}}
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
          data={dataTemplate}
          title="Concentration"
          subheader="Range per 5 second (%)"
          color={theme.palette.chart.green[0]}
          measure="%"
        />
      </Grid>

      <Grid item xs={12} md={6} lg={4}></Grid>
    </>
  );
};

export default Concentration;
