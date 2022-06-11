// material
import { Box, Container, Grid, Typography } from '@mui/material'
import { DEVICES } from 'constants'
import BlockCharts from 'containers/BlockCharts'
// components
import Page from '../components/Page'
import Device from '../containers/Devices'

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
          {DEVICES.filter((item) => item.type === 'chart').map((item) => (
            <BlockCharts item={item} key={item.key} />
          ))}
        </Grid>
      </Container>
    </Page>
  );
}
