import React, { useState, useEffect } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Input,
  MenuItem,
  FormControl,
  Select,
  DialogTitle
} from '@mui/material';

 

export default function ModalOrder(props) {
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
          <Input placeholder="Tên người nhận " defaultValue = {defaultValue?.name_receiver || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true} onChange={handleChangeInput('name_receiver')}/>
          <Input placeholder="Địa chỉ" defaultValue = {defaultValue?.address_receiver || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true}  onChange={handleChangeInput('address_receiver')} />
          <Input placeholder="Số điện thoại" defaultValue = {defaultValue?.phone_receiver || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true}   onChange={handleChangeInput('phone_receiver')}/>
          </Stack>
          <Stack  spacing={2} direction="row">
          <Input placeholder="Khối lượng(kg)" defaultValue = {defaultValue?.m_pro || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true}  onChange={handleChangeInput('m_pro')}/>
          <Input placeholder="Kích thước(m&#179;)" defaultValue = {defaultValue?.v_pro || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true}   onChange={handleChangeInput('v_pro')}/>
          <Input placeholder="Khoảng cách(km)" defaultValue = {defaultValue?.distance || ''} inputProps= {{ 'aria-label': 'description' }} fullWidth= {true}   onChange={handleChangeInput('distance')}/>
          </Stack>
          <Stack  spacing={2} direction="row">
          <Input placeholder="Thu hộ(VND)" defaultValue = {defaultValue?.cash || ''} inputProps= {{ 'aria-label': 'description' }}   onChange={handleChangeInput('cash')}/>
           
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
