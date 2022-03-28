import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
import { sentenceCase } from 'change-case';

import Page from 'components/Page';
import Iconify from 'components/Iconify';
import Scrollbar from 'components/Scrollbar';
import USERLIST from '../../_mocks_/user';
import { UserListHead, UserMoreMenu } from 'sections/@dashboard/user';
import Label from 'components/Label';
import DialogSchedule from 'components/DialogSchedule';

import { TABLE_HEAD_SCHEDULES } from 'constants'
 

const Schedule = (props) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenCreate = () => {
    setOpenDialog(true);
  };
  return (
    <Page title="Schedule ">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Light
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
                <UserListHead
                  order={'desc'}
                  orderBy={'time'}
                  headLabel={TABLE_HEAD_SCHEDULES}
                />
                <TableBody>
                  {USERLIST.map((row) => {
                    const { id, name, role, status, company, avatarUrl, isVerified } = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={isVerified}>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={4}>
                            <Box sx={{ p: 2 }}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{company}</TableCell>
                        <TableCell align="left">{isVerified ? role : 'Disabled'}</TableCell>

                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(status === 'banned' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          <Switch checked={isVerified} onChange={() => {}} color="warning" />
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
      <DialogSchedule open={openDialog} setOpen={setOpenDialog} />
    </Page>
  );
};

export default Schedule;
