// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import Device from '../containers/Devices';
import Temperature from '../containers/Temperature';
import Concentration from '../containers/Concentration';
import Moisture from '../containers/Moisture'
// ----------------------------------------------------------------------

export default function DashboardApp() {
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Welcome SmartHouse</Typography>
        </Box>
        <Grid container spacing={3}>
          <Device />
          <Temperature />
          <Concentration />
          <Moisture/>
        </Grid>
      </Container>
    </Page>
  );
}
