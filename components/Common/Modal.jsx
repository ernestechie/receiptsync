import React from 'react';
import { Clear } from '@mui/icons-material';
import { Typography, Box, IconButton } from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 440,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  position: 'relative',
};

export default function BasicModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        p: 2,
        bgcolor: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(8px)',
        transition: '0.5s ease-out',
      }}
    >
      <Box
        sx={{
          ...style,
          transition: '0.4s ease-in',
        }}
      >
        <IconButton
          sx={{ position: 'absolute', top: 12, right: 12 }}
          onClick={props.handleClose}
        >
          <Clear />
        </IconButton>
        <Typography id='modal-modal-title' fontSize={24} fontWeight={600}>
          {props.heading}
        </Typography>
        {props.children}
      </Box>
    </Modal>
  );
}
