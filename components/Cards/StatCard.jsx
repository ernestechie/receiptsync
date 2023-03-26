import { Box, Stack, Typography } from '@mui/material';
import { parseNigerianNaira } from '../../utils/parseCurrency';
import React from 'react';

const StatCard = (props) => {
  return (
    <Box
      p={2}
      sx={{
        border: props.border ? '1px solid #ccc' : 'none',
        bgcolor: props.primary ? 'primary.main' : 'inherit',
        borderRadius: 2,
        minHeight: '128px',
        color: props.primary ? '#fff' : '#222',
      }}
    >
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Typography>{props.title}</Typography>
        <Typography
          component='span'
          fontSize={12}
          fontWeight={400}
          px={1.5}
          py={0.25}
          border='1px solid rgb(0,0,0,0.2)'
          borderRadius={4}
        >
          {props.param}
        </Typography>
      </Stack>
      <Typography fontSize={24} fontWeight={700} py={1}>
        {props.money ? (
          <>{parseNigerianNaira(props.value)}</>
        ) : (
          <>{props.value.toLocaleString()}</>
        )}
      </Typography>
    </Box>
  );
};

export default StatCard;
