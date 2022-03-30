import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  DialogTitle
} from '@mui/material';

import { LocalizationProvider, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import ScheduleApi from 'apis/ScheduleApi';
import { OPTIONS_REPEATS_CHEDULE } from 'constants';
import { fTimeRange } from 'utils/formatTime';

export default function DialogSchedule(props) {
  const { open, setOpen, id, setTotal, itemEdit } = props;
  const [timePicker, setTimePicker] = useState(new Date());
  const [status, setStatus] = useState(true);
  const [repeat, setRepeat] = useState(['0']); 

  const handleChangeRepeat = (event) => {
    const values = [...event.target.value];
    const newValue = values.pop();
    if (newValue === '0') setRepeat(['0']);
    else {
      setRepeat(event.target.value.filter((value) => value !== '0'));
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

  const handleCreate = async (e) => {
    const data = {
      key_id: id.split('_').join('/'),
      start_time: fTimeRange(timePicker, 60),
      repeat: `${repeat}`,
      active: true,
      status
    }
    if(itemEdit) data._id = itemEdit
    await ScheduleApi.create(data).then(() => {
      setOpen(false);
      setRepeat(['0']);
      setTotal(pre=>pre+1)
    });
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
                {OPTIONS_REPEATS_CHEDULE.map(({ value, label }) => (
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
          <Button onClick={handleCreate}>{itemEdit?'Update':'Create'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
