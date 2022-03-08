import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectVariants(props) {
  const { value, defaultValues, label, handleChange } = props;

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-standard-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={handleChange}
          label={label}
        >
            
          {defaultValues.map((defaultValue) => (
            <MenuItem value={defaultValue.value}>{defaultValue.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
  );
}
