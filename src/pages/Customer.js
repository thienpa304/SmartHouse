import ManageSearchIcon from '@mui/icons-material/ManageSearch'
// material
import {
  Button,
  Card,
  Container,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow, TextField,
  Typography
} from '@mui/material'
import moment from 'moment';

import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import CustomerApi from 'apis/CustomerApi'
import ModalCustomer from 'components/ModalCustomer'
import { useEffect, useState } from 'react'
import Iconify from '../components/Iconify'
// components
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import Page from '../components/Page'
import Scrollbar from '../components/Scrollbar'
import { UserListHead, UserMoreMenu } from '../sections/@dashboard/user'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Tên khách hàng', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Điện thoại', alignRight: false },
  { id: 'sex', label: 'Giới tính', alignRight: false },
  { id: 'birth_day', label: 'Ngày sinh', alignRight: false }
];

// ----------------------------------------------------------------------

export default function Customer() {
  const [page, setPage] = useState(0);
  const [orderEdit, setOrderEdit] = useState({});
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listOrders, setListOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dateFindMax, setDateFindMax] = useState(new Date())
  useEffect(() => {
    CustomerApi.find().then((res) => {
      setListOrders(res);
    });
  }, []);

  const handleCreateOrder = (order) => {
    setOpenModal(false);
    let orderSave = {};
    if (order.ID) {
      orderSave = { ...order };
      setListOrders([
        ...listOrders.map((item) => {
          if (item.ID === order.ID) return orderSave;
          else return item;
        })
      ]);
    } else {
      orderSave = { ...order, status: 0 };
      setListOrders([...listOrders, orderSave]);
    }

    CustomerApi.create(orderSave);
  };
  const handleEditOrder = (ID) => (event) => {
    const orderUpdate = listOrders.filter((item) => item.ID === ID);
    setOrderEdit(orderUpdate[0]);
    setOpenModal(true);
  };
  const handleDeleteOrder = (id) => {
    setListOrders([...listOrders.filter((item) => item.ID !== id)]);
    CustomerApi.deleteById(id);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeSearch = (event) => {
    let searchName = event.target.value;
    
    setSearchText(searchName);
    CustomerApi.find().then((res) => {
      let newListOrder = res.filter(item => item.name.includes(searchName));
      setListOrders(newListOrder);
    });
      
    
  };
  const handleFindMaxPrice = () => {
    const datePicker = moment(dateFindMax).format('YYYY-MM-DD')
     
    CustomerApi.findMaxPrice({datePicker}).then((res) => {
      if(res.length){
        const max = res.reduce((pre, cur) => {
          if(cur.total > pre.total)  return cur
          return pre
        })
        const newListOrder = [...listOrders].filter(item => item.ID === max.ID)
        setListOrders([...newListOrder])
      }
      else setListOrders([])
    })
  }
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleResetFilter = (event) => {
    CustomerApi.find().then((res) => {
      setListOrders(res);
    });
  }

  return (
    <Page title="Khách hàng  | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Khách hàng
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
              setOrderEdit({});
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Thêm khách hàng
          </Button>
        </Stack>
        <Stack mb={5} direction="row">
          <FormControl variant="standard" sx={{margin: '0 30px'}}>
            <InputLabel htmlFor="input-with-icon-adornment">Tìm kiếm</InputLabel>
            <Input
              id="input-with-icon-adornment"
              value={searchText}
              onChange={handleChangeSearch}
              startAdornment={
                <InputAdornment position="start">
                  <ManageSearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}  >
          <DesktopDatePicker 
          label="Ngày chọn"
          inputFormat="MM/dd/yyyy"
          value={dateFindMax}
          onChange={(value) =>{setDateFindMax(value)}}
          renderInput={(params) => <TextField {...params} />}
        />
          </LocalizationProvider>
          <Button variant="contained"  sx={{margin: '0 30px'}}
          onClick={handleFindMaxPrice}
          >Find Max  </Button>
          <Button variant="contained"  sx={{margin: '0 0 0 350px', backgroundColor: '#ff9800'}}
          onClick={handleResetFilter}
          >Reset  </Button>
        </Stack>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={listOrders.length}
                  numSelected={selected.length}
                />
                <TableBody>
                  {listOrders.map(({ ID, name, email, phone, sex, birth_day }) => (
                    <TableRow hover key={ID} tabIndex={-1} role="checkbox">
                      <TableCell component="th" scope="row">
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="subtitle2" noWrap>
                          {/* <Checkbox
                              checked={false}
                              onChange={(event) => {}}
                            /> */}
                            {name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">{phone}</TableCell>
                      <TableCell align="left">{sex}</TableCell>
                      <TableCell align="left">{new Date(birth_day).toDateString()}</TableCell>

                      <TableCell align="right">
                        <UserMoreMenu
                          onDeleted={() => handleDeleteOrder(ID)}
                          onEdited={handleEditOrder(ID)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={listOrders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <ModalCustomer
          defaultValue={orderEdit}
          open={openModal}
          createOrder={handleCreateOrder}
          setOpen={(value) => setOpenModal(value)}
        />
      </Container>
    </Page>
  );
}
