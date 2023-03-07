import React from 'react';
import HeadWrapper from '../../components/HeadWrapper';
import Padding from '../../layouts/Padding';
import VendorLayout from '../../layouts/VendorLayout';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { receipts } from '../../static/receipts';
import { options, labels, calculateData } from '../../utils/chart';
import { Box, Stack, Typography } from '@mui/material';
import { InsightsHeader } from '../../components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Insights() {
  const thisYear = receipts.filter(
    (receipt) =>
      new Date(receipt.dateCreated).getUTCFullYear() ===
      new Date().getUTCFullYear()
  );

  console.log(calculateData(thisYear));

  const sample_data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Sales',
        lineTension: 0.4,
        borderColor: 'rgb(124, 93, 250)',
        backgroundColor: 'rgba(124, 93, 250, 0.2)',
        data: calculateData(thisYear),
      },
    ],
  };

  return (
    <>
      <HeadWrapper />
      <VendorLayout>
        <Padding>
          <InsightsHeader />
          <Box
            p={1}
            sx={{
              width: '100%',
              maxWidth: 800,
              height: 400,
              mx: 'auto',
              // bgcolor: { sm: '#fff' },
              bgcolor: '#fff',
              px: { sm: 1 },
              py: 2,
              borderRadius: 1,
              boxShadow: { sm: '0px 10px 10px -10px rgba(72, 84, 159, 0.1)' },

              '& canvas': {
                mx: { sm: 'auto' },
              },
            }}
          >
            <Stack
              p={2}
              direction='row'
              alignItems='center'
              justifyContent='space-between'
              gap={1}
              mb={2}
            >
              <Typography fontWeight={500}>Product Sales</Typography>
              <Typography fontWeight={600} fontSize={20}>
                N{(14759862).toLocaleString()}
              </Typography>
            </Stack>
            <Line options={options} data={sample_data} />
          </Box>
        </Padding>
      </VendorLayout>
    </>
  );
}
