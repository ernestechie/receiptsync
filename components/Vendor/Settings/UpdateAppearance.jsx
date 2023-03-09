import React, { useState } from 'react';
import { Box, Radio, Stack, Typography } from '@mui/material';
import { DarkModeRounded, ReceiptLong } from '@mui/icons-material';

const UpdateAppearance = () => {
  const [selectedAppTheme, setSelectedAppTheme] = useState('Light');
  const [selectedReceiptTheme, setSelectedReceiptTheme] = useState('Styled');

  const handleChangeAppTheme = (e) => {
    console.log(e.target.value);
    setSelectedAppTheme(e.target.value);
  };

  const handleChangeReceiptTheme = (e) => {
    console.log(e.target.value);
    setSelectedReceiptTheme(e.target.value);
  };

  return (
    <Box mt={4}>
      <Box mb={6}>
        <Stack direction='row' gap={2} alignItems='center' mb={1}>
          <DarkModeRounded />
          <Typography fontWeight={700} fontSize={20}>
            Theme
          </Typography>
        </Stack>
        <Typography>
          Adjust the appearance to reduce glare, eye strain, and give your eyes
          a break.
        </Typography>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography fontWeight={700}>Light</Typography>
          <Radio
            checked={selectedAppTheme === 'Light'}
            onChange={handleChangeAppTheme}
            value='Light'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'Light' }}
          />
        </Stack>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography fontWeight={700}>Dark</Typography>
          <Radio
            checked={selectedAppTheme === 'Dark'}
            onChange={handleChangeAppTheme}
            value='Dark'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'Dark' }}
          />
        </Stack>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography fontWeight={700}>Auto</Typography>
          <Radio
            checked={selectedAppTheme === 'Auto'}
            onChange={handleChangeAppTheme}
            value='Auto'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'Auto' }}
          />
        </Stack>
      </Box>
      <Box>
        <Stack direction='row' gap={2} alignItems='center' mb={1}>
          <ReceiptLong />
          <Typography fontWeight={700} fontSize={20}>
            Receipt Layout
          </Typography>
        </Stack>
        <Typography>
          Select the layout of the receipts when sent for print
        </Typography>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography fontWeight={700}>Compact</Typography>
          <Radio
            checked={selectedReceiptTheme === 'Compact'}
            onChange={handleChangeReceiptTheme}
            value='Compact'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'Compact' }}
          />
        </Stack>
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography fontWeight={700}>Styled</Typography>
          <Radio
            checked={selectedReceiptTheme === 'Styled'}
            onChange={handleChangeReceiptTheme}
            value='Styled'
            name='radio-buttons'
            inputProps={{ 'aria-label': 'Styled' }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default UpdateAppearance;
