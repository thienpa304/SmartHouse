import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Team A',
    type: 'column',
    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
  }
];

const ChartView = (props) => {
  const theme = useTheme();
  const { data, title, subheader, color, action } = props;
  const labels = data.labels;
  const dataChart = [{
    data: data.data,
    name: data.name,
    type: data.type
  }]
  const unit = data.unit;

  const chartOptions = merge(BaseOptionChart(), {
    colors: [color || theme.palette.chart.red[0]],
    stroke: { width: [2] },
    plotOptions: {},
    fill: { type: ['gradient'] },
    labels: labels || [
      '02:03:03',
      '02:03:08',
      '02:03:13',
      '02:03:15',
      '02:03:20',
      '02:03:25',
      '02:03:30',
      '02:03:35',
      '02:03:40',
      '02:03:45',
      '02:03:50'
    ],
    xaxis: {
      type: 'category',
      labels: {
        datetimeFormatter: {
          hour: 'HH:mm:ss'
        }
      }
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} ${unit || 'NaN'}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader
        action={action}
        title={title || 'Temperature'}
        subheader={subheader || 'Range per  5 second (°C)'}
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={dataChart || CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
};
export default ChartView;
