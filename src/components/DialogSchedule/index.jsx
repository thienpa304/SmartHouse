import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DialogTitle from '@mui/material/DialogTitle';
import TimePicker from '@mui/lab/TimePicker';

import { optionsRepeatSchedule } from 'constants';

export default function DialogSchedule(props) {
  const { open, setOpen } = props;
  const [timePicker, setTimePicker] = React.useState(new Date());
  const [status, setStatus] = React.useState(true);
  const [repeat, setRepeat] = React.useState(['1']);

  const handleChangeRepeat = (event) => {
    const values = [...event.target.value];
    const newValue = values.pop();

    if (newValue === '1') setRepeat(['1']);
    else if (newValue === '0') setRepeat(['0']);
    else {
      setRepeat(event.target.value.filter((value) => value !== '0' && value !== '1'));
    }
  };
  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeTimePicker = (newValue) => {
    setTimePicker(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={'xs'}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <FormControl sx={{ mt: 1 }}>
              <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={status}
                onChange={handleChangeStatus}
                fullWidth
                label="Status"
              >
                <MenuItem value={true}>On </MenuItem>
                <MenuItem value={false}>Off </MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Time"
                value={timePicker}
                onChange={handleChangeTimePicker}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Repeat</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={repeat}
                onChange={handleChangeRepeat}
                label="Repeat"
                fullWidth
                multiple
              >
                {optionsRepeatSchedule.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
