import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Grid } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import { MesureApi } from 'apis'
import ChartView from 'components/ChartView'
import SelectVariants from 'components/SelectVariants'
import React, { useEffect, useState } from 'react'
import Socket from 'Socket'
import { formatkey } from 'utils'
import { fTimeRange } from 'utils/formatTime.js'


const BlockCharts = (props) => {
  const { item } = props;

  const theme = useTheme();
  const [selectDate, setSelectDate] = useState(new Date());
  const [timeRange, setTimeRange] = useState(5);
  const [data, setData] = useState({
    values: [],
    labels: []
  });
  useEffect(() => {
    MesureApi.findByKey(
      'key',
      {
        keyId: formatkey(item.key),
        filter: timeRange,
        sort: 'updated_at',
        offset: 0,
        limit: 20
      },
      (res) => {
        setData((state) => ({ ...state, ...res }));
        Socket.comsumer(formatkey(item.key), (mess) => {
          const currDate = new Date();
          const currDateRound = new Date(0);
          const newDate = currDate - ((currDate - currDateRound) % timeRange) * 1000;
          const label = fTimeRange(newDate, timeRange);
          const checked = label === [...res.labels].pop();
          if (!checked) {
            setData((state) => {
              const newState = { ...state };
              newState.labels.push(label);
              newState.values.push(Number(mess));
              return {
                values: newState.values.slice(state.values.length - 20 || 0),
                labels: newState.labels.slice(state.labels.length - 20 || 0)
              };
            });
          }
        });
      }
    );
  }, [timeRange, item.key]);

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
          maxDate={new Date()}
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
          unit={item.unit}
          type="area"
          title={item.name}
          subheader={`Range per 5 second (${item.unit})`}
          color={theme.palette.chart[`${item.color}`][0]}
        />
      </Grid>
    </>
  );
};

export default BlockCharts;
