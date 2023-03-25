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
        borderRadius: 3,
        py: 1.5,
        px: 3,
        textTransform: 'capitalize',
        fontSize: 16,
        ...props.style,
      }}
      startIcon={props.startIcon && props.startIcon}
      onClick={props.handleClick}
      {...props}
    >
      {props.text}
    </Button>
  );
};
