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
import { Box } from '@mui/material';

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
          <Box sx={{ width: '100%', maxWidth: 768, mx: 'auto' }}>
            <Line options={options} data={sample_data} />
          </Box>
        </Padding>
      </VendorLayout>
    </>
  );
}
