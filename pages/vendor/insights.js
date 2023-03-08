import React, { useEffect, useState } from 'react';
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
  ArcElement,
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import { options, useCalculateData, labels } from '../../utils/chart';
import { Box, Stack, Typography } from '@mui/material';
import { receipts } from '../../static/receipts';
import { InsightsHeader } from '../../components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ArcElement
);

export default function Insights() {
  const [thisYearProducts, setThisYearProduct] = useState([]);
  const [thisYearReceipts, setThisYearReceipts] = useState([]);

  useEffect(() => {
    const thisYear = receipts.filter(
      (receipt) => new Date(receipt.dateCreated).getUTCFullYear() === 2022
    );

    setThisYearReceipts(thisYear);

    const products = [];
    thisYear.forEach((receipt) => {
      products.push(...receipt.items);
    });

    setThisYearProduct(products);
  }, []);

  useEffect(() => {
    thisYearProducts.forEach((product, index) => {
      if (
        thisYearProducts.length > index + 1 &&
        product.id === thisYearProducts[index + 1].id
      ) {
        console.log(`Product occurs ${index + 1} times`);
      }
    });
  }, [thisYearProducts]);

  const line_chart_data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Sales',
        lineTension: 0.4,
        borderColor: 'rgb(124, 93, 250)',
        backgroundColor: 'rgba(124, 93, 250, 0.2)',
        data: useCalculateData(thisYearReceipts),
      },
    ],
  };

  const pie_chart_data = {
    labels: [
      'Pure Bliss',
      'MUI Sketchbook',
      'iPhone 11 pro max',
      'iPhone 14 pro max',
    ],
    datasets: [
      {
        fill: true,
        label: 'Units Sold',
        backgroundColor: [
          'rgba(126, 136, 195, 1)',
          'rgba(37, 41, 69, 1)',
          'rgba(236, 87, 87, 1)',
          'rgba(255, 151, 151, 1)',
        ],
        data: [1024, 640, 384, 256],
        hoverOffset: 8,
        borderWidth: 1,
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
              maxHeight: 512,
              mx: 'auto',
              bgcolor: '#fff',
              px: { sm: 1 },
              py: 2,
              borderRadius: 1,
              boxShadow: { sm: '0px 10px 10px -10px rgba(72, 84, 159, 0.1)' },
              mb: 2,
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
            <Line options={options} data={line_chart_data} />
          </Box>
          <Box
            p={1}
            sx={{
              width: '100%',
              maxWidth: 800,
              maxHeight: 800,
              mx: 'auto',
              bgcolor: '#fff',
              px: { sm: 1 },
              py: 2,
              borderRadius: 1,
              boxShadow: { sm: '0px 10px 10px -10px rgba(72, 84, 159, 0.1)' },

              '& canvas': {
                mx: 'auto',
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
              <Typography fontWeight={500}>Most Sold: (Pure Bliss)</Typography>
              <Typography fontWeight={600} fontSize={20}>
                {(1024).toLocaleString()} Units
              </Typography>
            </Stack>
            <Pie options={options} data={pie_chart_data} />
          </Box>
        </Padding>
      </VendorLayout>
    </>
  );
}
