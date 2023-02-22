import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Form, FormikProvider, useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
export default function ModalCustomer(props) {
  const { open, setOpen, createOrder, defaultValue } = props;
  const [order, setOrder] = useState({});

  // useEffect(() => {
  //   if (defaultValue) setOrder(defaultValue);
  // }, [defaultValue]);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name required'),
    email: Yup.string().email('Must be a valid email').required('Email required'),
    phone: Yup.string().length(10, 'Phone is not validated!').required('Phone required'),
    sex: Yup.string().required('Field is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: '',
      phone: '',
      sex: 0,
      ...defaultValue
    },
    validationSchema: RegisterSchema,
    onSubmit: (value) => {
      createOrder(value);
    }
  });
  const { errors, touched, handleSubmit, setFieldValue, getFieldProps, values } = formik;
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
                    placeholder="Tên khách hàng"
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    placeholder="Email"
                    inputProps={{ 'aria-label': 'description' }}
                    fullWidth={true}
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
                <Stack spacing={2} direction="row">
                  <TextField
                    placeholder="Số điện thoại"
                    inputProps={{ 'aria-label': 'description' }}
                    {...getFieldProps('phone')}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <TextField
                    placeholder="Giới tính"
                    inputProps={{ 'aria-label': 'description' }}
                    {...getFieldProps('sex')}
                    error={Boolean(touched.sex && errors.sex)}
                    helperText={touched.sex && errors.sex}
                  />
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Ngày sinh "
                      inputFormat="MM/dd/yyyy"
                      value={values.birth_day}
                      onChange={(value) => setFieldValue('birth_day', value, false)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
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
