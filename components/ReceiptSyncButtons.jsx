import React from 'react';
import { Button } from '@mui/material';

export const ButtonContained = (props) => {
  return (
    <Button
      variant='contained'
      disableElevation
      color={props.color}
      sx={{
        color: props.textColor,
        borderRadius: 2,
        py: 1.5,
        px: 3,
        textTransform: 'capitalize',
        fontSize: 16,
      }}
      startIcon={props.startIcon && props.startIcon}
      onClick={props.handleClick}
    >
      {props.text}
    </Button>
  );
};
