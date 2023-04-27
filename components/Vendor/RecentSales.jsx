import React from 'react';
import { Box, Typography } from '@mui/material';
import ReceiptCard from '../Receipt/ReceiptCard';
import { useSelector } from 'react-redux';

const RecentSales = () => {
  const {
    entities: {
      receipts: { receipts },
    },
  } = useSelector((state) => state);

  return (
    <Box my={6} sx={{ mx: 'auto !important', maxWidth: 1024 }}>
      <Typography fontSize={20} fontWeight={700} mb={2}>
        Most Recent Sales
      </Typography>

      {receipts?.length > 0 ? (
        <>
          {[...receipts]
            .sort(
              (a, b) =>
                new Date(b.dateIssued).getTime() -
                new Date(a.dateIssued).getTime()
            )
            .splice(0, 5)
            .map((receipt) => (
              <ReceiptCard key={receipt.receiptNumber} receipt={receipt} />
            ))}
        </>
      ) : (
        <Typography fontSize={16} fontWeight={400} my={4} textAlign='center'>
          No recent sales
        </Typography>
      )}
    </Box>
  );
};

export default RecentSales;
