import { useEffect, useState } from 'react'
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
  TableRow,
  Typography
} from '@mui/material'
// components
import Iconify from '../components/Iconify'
import Page from '../components/Page'
import Scrollbar from '../components/Scrollbar'

import ModalOrder from 'components/ModalOrder'
import { UserListHead, UserMoreMenu } from '../sections/@dashboard/user'

import OrderApi from 'apis/OrderApi'
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name_receiver', label: 'Tên', alignRight: false },
  { id: 'address_receiver', label: 'Địa chỉ', alignRight: false },
  { id: 'phone_receiver', label: 'Điện thoại', alignRight: false },
  { id: 'm_pro', label: 'Khối lương', alignRight: false },
  { id: 'v_pro', label: 'Kích thước ', alignRight: false },
  { id: 'distance', label: 'Khoảng cách', alignRight: false },
  { id: 'cash', label: 'Thu hộ', alignRight: false },
  { id: 'status', label: 'Trạng thái ', alignRight: false }
];
const STATUS_ORDER = {
  0: 'Đang lấy hàng',
  1: 'Đang giao',
  2: 'Đã hoàn thành'
};

// ----------------------------------------------------------------------

export default function User() {
  const [page, setPage] = useState(0);
  const [orderEdit, setOrderEdit] = useState({});
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listOrders, setListOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    OrderApi.find().then((res) => {
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

    OrderApi.create(orderSave);
  };
  const handleEditOrder = (ID) => (event) => {
    const orderUpdate = listOrders.filter((item) => item.ID === ID);
    setOrderEdit(orderUpdate[0]);

    setOpenModal(true);
  };
  const handleDeleteOrder = (id) => {
    setListOrders([...listOrders.filter((item) => item.ID !== id)]);
    OrderApi.deleteById(id);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Page title="Đơn Hàng  | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Đơn Hàng
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setOpenModal(true);
              setOrderEdit({});
            }}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Tạo đơn hàng
          </Button>
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
                  {listOrders.map(
                    ({
                      ID,
                      name_receiver,
                      address_receiver,
                      phone_receiver,
                      m_pro,
                      v_pro,
                      distance,
                      cash,
                      status
                    }) => (
                      <TableRow hover key={ID} tabIndex={-1} role="checkbox">
                        <TableCell component="th" scope="row">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name_receiver}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{address_receiver}</TableCell>
                        <TableCell align="left">{phone_receiver}</TableCell>
                        <TableCell align="left">{m_pro}</TableCell>
                        <TableCell align="left">{v_pro}</TableCell>
                        <TableCell align="left">{distance}</TableCell>
                        <TableCell align="left">
                          {cash.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                        </TableCell>
                        <TableCell align="left">{STATUS_ORDER[status]}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu
                            onDeleted={() => handleDeleteOrder(ID)}
                            onEdited={handleEditOrder(ID)}
                          />
                        </TableCell>
                      </TableRow>
                    )
                  )}
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
        <ModalOrder
          defaultValue={orderEdit}
          open={openModal}
          createOrder={handleCreateOrder}
          setOpen={(value) => setOpenModal(value)}
        />
      </Container>
    </Page>
  );
}
