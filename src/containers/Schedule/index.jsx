import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Stack,
  Typography,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Card,
  Switch,
  Box
} from '@mui/material';

import Page from 'components/Page';
import Iconify from 'components/Iconify';
import Scrollbar from 'components/Scrollbar';
import { UserListHead, UserMoreMenu } from 'sections/@dashboard/user';
import Label from 'components/Label';
import DialogSchedule from 'components/DialogSchedule';

import SearchNotFound from 'components/SearchNotFound';

import { TABLE_HEAD_SCHEDULES, NAME_DEVICES, keyId } from 'constants';

import ScheduleApi from 'apis/ScheduleApi';

const Schedule = (props) => {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);
  const [items, setItems] = useState([]);
  const [itemEdit, setItemEdit] = useState();
  const [device, setDevice] = useState('Light');
  const [total, setTotal] = useState(0);
  const id = location.pathname.split('/').pop();

  useEffect(() => {
    Object.keys(keyId).forEach((key) => {
      const check = keyId[key] === id.split('_').join('/');
      if (check) setDevice(NAME_DEVICES[key]);
    });

    ScheduleApi.getByKey(id).then((res) => {
      setItems([...res.items]);
    });
  }, [id, total]);

  const handleOpenCreate = () => {
    setOpenDialog(true);
  };

  const handleChangeStatus = (_id) => (event) => {
    ScheduleApi.create({
      _id,
      active: event.target.checked
    }).then(() => {
      setTotal((pre) => pre + 1);
    });
  };

  const handleEdit = (_id) => (event) => {
    setOpenDialog(true);
    setItemEdit(_id);
  };
  const handleDelete = (_id) => (event) => {
    ScheduleApi.deleteById(_id).then(() => {
      setTotal((pre) => pre + 1);
    });
  };
  const isUserNotSchedule = items.length === 0;

  return (
    <Page title="Schedule ">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            {device}
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpenCreate}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New Schedule
          </Button>
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead order={'desc'} orderBy={'time'} headLabel={TABLE_HEAD_SCHEDULES} />
                {items.length < 0 || (
                  <TableBody>
                    {items.map((row) => {
                      const { startTime, active, status, repeat, updatedAt, _id } = row;
                      return (
                        <TableRow hover key={_id} tabIndex={-1} role="checkbox" selected={active}>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={4}>
                              <Box sx={{ p: 2 }}>
                                <Typography variant="subtitle2" noWrap>
                                  {startTime}
                                </Typography>
                              </Box>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{repeat}</TableCell>
                          <TableCell align="left">{updatedAt}</TableCell>

                          <TableCell align="left">
                            <Label variant="ghost" color={(status && 'success') || 'error'}>
                              {(status && 'On') || 'Off'}
                            </Label>
                          </TableCell>
                          <TableCell align="left">
                            <Switch
                              checked={active}
                              onChange={handleChangeStatus(_id)}
                              color="warning"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu onEdit={handleEdit(_id)} onDelete={handleDelete(_id)} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
                {isUserNotSchedule && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={device} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      <DialogSchedule
        open={openDialog}
        setOpen={setOpenDialog}
        setTotal={setTotal}
        id={id}
        itemEdit={itemEdit}
      />
    </Page>
  );
};

export default Schedule;
