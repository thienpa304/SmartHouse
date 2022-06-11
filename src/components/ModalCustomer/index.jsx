import {
  Button, Dialog,
  DialogActions,
  DialogContent, DialogTitle, Input, Stack, TextField
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import React, { useEffect, useState } from 'react'

export default function ModalCustomer(props) {
  const { open, setOpen, createOrder, defaultValue } = props;
  const [order, setOrder] = useState({})
  
  const handleChangeInput = (key) => (event) => {
    setOrder({...order, [`${key}`]: event.target.value})
  }
  useEffect(()=>{
    if(defaultValue) setOrder(defaultValue)
    
  },[defaultValue])
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} maxWidth={'md'}>
        <DialogTitle>Create</DialogTitle>
        <DialogContent>
           
          <Stack  spacing={4}>
          <Stack  spacing={2} direction="row">
          <Input placeholder="Tên khách hàng  " defaultValue = {defaultValue?.name || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true} onChange={handleChangeInput('name')}/>
          <Input placeholder="Email" defaultValue = {defaultValue?.email || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true}  onChange={handleChangeInput('email')} />
          </Stack>
          <Stack  spacing={2} direction="row">
          <Input placeholder="Số điện thoại" defaultValue = {defaultValue?.phone || ''} inputProps= {{ 'aria-label': 'description' }}    onChange={handleChangeInput('phone')}/>
          <Input placeholder="Giới tính" defaultValue = {defaultValue?.sex || ''} inputProps= {{ 'aria-label': 'description' }}     onChange={handleChangeInput('sex')}/>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
          label="Ngày sinh "
          inputFormat="MM/dd/yyyy"
          value={defaultValue?new Date(order.birth_day): new Date()}
          onChange={(value) => setOrder({...order, birth_day: value})}
          renderInput={(params) => <TextField {...params} />}
        />
          </LocalizationProvider>
          </Stack>
           
          
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          {defaultValue? <Button onClick={()=>{createOrder(order)}}>{'Save'}</Button> :
          <Button onClick={()=>{createOrder(order)}}>{'Create'}</Button>}
           
        </DialogActions>
      </Dialog>
    </div>
  );
}
