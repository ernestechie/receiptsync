import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardHeader, CardMedia, Divider } from '@mui/material';
import { CardActions, CardContent, Collapse } from '@mui/material';
import { MenuItem, IconButton, Typography } from '@mui/material';
import { parseDate } from '../../utils/parseDate';
import { StyledMenu, ExpandMore } from '../Common/Menu';
import { Delete } from '@mui/icons-material';

function CustomizedMenus(props) {
  return (
    <StyledMenu
      id='demo-customized-menu'
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
    >
      <MenuItem onClick={props.handleClose} disableRipple>
        <EditIcon />
        Edit
      </MenuItem>
      <MenuItem onClick={props.handleClose} disableRipple>
        <Delete />
        Delete
      </MenuItem>
    </StyledMenu>
  );
}

export default function ProductItem({ product }) {
  const [expanded, setExpanded] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: 400,
        mx: 'auto',
        borderRadius: 3,
        boxShadow: '0px 10px 10px -10px rgba(72, 84, 159, 0.2)',
        p: 1,
      }}
    >
      <CardHeader
        title={product.name}
        subheader={parseDate(product.dateAdded)}
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: 20,
            fontWeight: 500,
          },
          '& .MuiCardHeader-subheader': {
            fontSize: 14,
          },
        }}
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon onClick={handleClick} />
            <CustomizedMenus
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
            />
          </IconButton>
        }
      />
      <CardMedia
        component='img'
        height='194'
        image={product.image}
        alt={product.description}
        sx={{ objectFit: 'contain' }}
      />
      <CardActions disableSpacing>
        <Typography px={1} fontSize={20} fontWeight={700}>
          N{product.price.toLocaleString()}
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <Divider />
        <CardContent>
          <Typography paragraph fontWeight={700}>
            Name:{' '}
            <Typography fontWeight={400} component='span'>
              {product.name}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700}>
            Description:{' '}
            <Typography fontWeight={400} component='span'>
              {product.description}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700}>
            Price:{' '}
            <Typography fontWeight={400} component='span'>
              N{product.price.toLocaleString()}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700}>
            Date Added:{' '}
            <Typography fontWeight={400} component='span'>
              {parseDate(product.dateAdded)}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700}>
            Last Updated:{' '}
            <Typography fontWeight={400} component='span'>
              {parseDate(product.dateUpdated)}
            </Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
