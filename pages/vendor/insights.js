import React, { useContext, useEffect, useState } from 'react';
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
import { InsightsHeader, Loader } from '../../components';
import vendorContext from '../../context/VendorContext';
import PrivateRoute from '../../layouts/PrivateRoute';
import { parseNigerianNaira } from '../../utils/parseCurrency';
import { useSelector } from 'react-redux';

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
  const [pieLabels, setPieLabels] = useState([]);
  const [pieData, setPieData] = useState([]);

  const {
    entities: {
      vendor: { loading: vendorLoading },
      receipts: { receipts, loading: receiptsLoading },
      products: { loading: productsLoading },
    },
  } = useSelector((state) => state);

  const { selectedYear } = useContext(vendorContext);

  useEffect(() => {
    const thisYear = receipts.filter(
      (receipt) =>
        new Date(receipt.dateIssued).getUTCFullYear() === selectedYear
    );

    setThisYearReceipts(thisYear);

    const products = [];
    thisYear.forEach((receipt) => {
      products.push(...receipt.items);
    });

    setThisYearProduct(products);
  }, [selectedYear, receipts]);

  useEffect(() => {
    const arr = thisYearProducts;

    let map = new Map();

    for (let i = 0; i < arr.length; i++) {
      if (map.has(arr[i]._id)) map.set(arr[i]._id, map.get(arr[i]._id) + 1);
      else map.set(arr[i]._id, 1);
    }

    for (let i = 0; i < arr.length; i++) {
      if (map.get(arr[i]._id) > 1) {
        map.set(arr[i]._id, 0);
      }
    }

    let keysArray = Array.from(map.keys());

    if (keysArray.length > 4) {
      keysArray.splice(4, 1);
    }

    const labelObjects = keysArray.map((key) => {
      return {
        [key]: thisYearProducts.filter((product) => product._id === key),
      };
    });

    const dataObjects = keysArray.map((key) => {
      return {
        [key]: thisYearProducts
          .filter((product) => product._id === key)
          .map((item) => item.qty)
          .reduce((a, b) => a + b, 0),
      };
    });

    const labels = [];

    labelObjects.forEach((label) => {
      for (const key in label) {
        labels.push(label[key][0]['productName'].toUpperCase());
      }
    });

    const data = [];
    dataObjects.forEach((item) => {
      for (const key in item) {
        data.push(item[key]);
      }
    });

    setPieData(data.splice(0, 4));
    setPieLabels(labels.splice(0, 4));
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
    labels: pieLabels,
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
        data: pieData,
        hoverOffset: 4,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {receiptsLoading || productsLoading || (vendorLoading && <Loader />)}
      <PrivateRoute>
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
                  {parseNigerianNaira(
                    useCalculateData(thisYearReceipts).reduce(
                      (a, b) => a + b,
                      0
                    )
                  )}
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
              {pie_chart_data.datasets[0].data.length > 0 && (
                <>
                  <Stack
                    p={2}
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    gap={1}
                    mb={2}
                  >
                    <Typography fontWeight={700} fontSize={20}>
                      Most Sold Products
                    </Typography>
                  </Stack>
                  <Pie options={options} data={pie_chart_data} />
                </>
              )}
              {!pie_chart_data.datasets[0].data.length > 0 && (
                <Typography
                  textAlign='center'
                  fontSize={24}
                  fontWeight={600}
                  p={4}
                >
                  No data available
                </Typography>
              )}
            </Box>
          </Padding>
        </VendorLayout>
      </PrivateRoute>
    </>
  );
}
