import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import CustomerApi from 'apis/CustomerApi';
import { Form, FormikProvider, useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
const STATUS_ORDER = {
  0: 'Đang lấy hàng',
  1: 'Đang giao',
  2: 'Đã hoàn thành'
};

export default function ModalOrder(props) {
  const { open, setOpen, createOrder, defaultValue } = props;
  const [order, setOrder] = useState({});
  const [customer, setCustomer] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    CustomerApi.find().then((res) => {
      setCustomer(res);
    });
  }, []);
  useEffect(() => {
    setOrder(defaultValue || {});
  }, [defaultValue]);

  const RegisterSchema = Yup.object().shape({
    name_receiver: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    address_receiver: Yup.string().required('Address required'),
    phone_receiver: Yup.string().length(10, 'Phone is not validated!').required('Phone required'),
    m_pro: Yup.number().required('Field is required'),
    v_pro: Yup.number().required('Field is required'),
    distance: Yup.number().required('Field is required'),
    cash: Yup.number().required('Field is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name_receiver: '',
      address_receiver: '',
      phone_receiver: '',
      m_pro: 0,
      v_pro: 0,
      distance: 0,
      cash: 0,
      status: 0,
      id_account: 1,
      ...order
    },
    validationSchema: RegisterSchema,
    onSubmit: (value) => {
      createOrder(value);
    }
  });
  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} maxWidth={'md'}>
        <DialogTitle>Create</DialogTitle>

        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <DialogContent>
              <Stack spacing={4}>
                <Stack spacing={2} direction="row">
                  <TextField
                    placeholder="Tên người nhận "
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('name_receiver')}
                    error={Boolean(touched.name_receiver && errors.name_receiver)}
                    helperText={touched.name_receiver && errors.name_receiver}
                  />
                  <TextField
                    placeholder="Địa chỉ"
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('address_receiver')}
                    error={Boolean(touched.address_receiver && errors.address_receiver)}
                    helperText={touched.address_receiver && errors.address_receiver}
                  />
                  <TextField
                    placeholder="Số điện thoại"
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('phone_receiver')}
                    error={Boolean(touched.phone_receiver && errors.phone_receiver)}
                    helperText={touched.phone_receiver && errors.phone_receiver}
                  />
                </Stack>
                <Stack spacing={2} direction="row">
                  <TextField
                    placeholder="Khối lượng(kg)"
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('m_pro')}
                    error={Boolean(touched.m_pro && errors.m_pro)}
                    helperText={touched.m_pro && errors.m_pro}
                  />
                  <TextField
                    placeholder="Kích thước(m&#179;)"
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('v_pro')}
                    error={Boolean(touched.v_pro && errors.v_pro)}
                    helperText={touched.v_pro && errors.v_pro}
                  />
                  <TextField
                    placeholder="Khoảng cách(km)"
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('distance')}
                    error={Boolean(touched.distance && errors.distance)}
                    helperText={touched.distance && errors.distance}
                  />
                </Stack>
                <Stack spacing={2} direction="row">
                  <TextField
                    placeholder="Thu hộ(VND)"
                    inputProps={{ 'aria-label': 'description' }}
                    {...getFieldProps('cash')}
                    error={Boolean(touched.cash && errors.cash)}
                    helperText={touched.cash && errors.cash}
                  />
                  <Box sx={{ minWidth: 220 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Trạng thái đơn hàng</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={order?.status || 0}
                        label="Trạng thái đơn hàng "
                        {...getFieldProps('status')}
                      >
                        {Object.keys(STATUS_ORDER).map((item) => (
                          <MenuItem value={item}>{STATUS_ORDER[item]}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ minWidth: 420 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Khách hàng</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Khách hàng "
                        {...getFieldProps('id_account')}
                      >
                        {customer.map((item) => (
                          <MenuItem value={item.ID}>{`${item.name} - ${item.email}`}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              {defaultValue ? (
                <Button type="submit">{'Save'}</Button>
              ) : (
                <Button type="submit">{'Create'}</Button>
              )}
            </DialogActions>
          </Form>
        </FormikProvider>
      </Dialog>
    </div>
  );
}
