import { Delete } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  MenuItem,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { parseNigerianNaira } from '../../utils/parseCurrency';
import { parseDate } from '../../utils/parseDate';
import { ExpandMore, StyledMenu } from '../Common/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../../store/slices/productSlice';

function CustomizedMenus(props) {
  const dispatch = useDispatch();
  const {
    entities: {
      products: { products: PRODUCTS },
      vendor: { token },
    },
  } = useSelector((state) => state);

  return (
    <StyledMenu
      id={props.productId}
      MenuListProps={{
        'aria-labelledby': 'demo-customized-button',
      }}
      anchorEl={props.anchorEl}
      open={props.open}
      onClose={props.handleClose}
    >
      {/* <MenuItem onClick={() => editProductHandler(props.productId)}>
        <EditIcon />
        Edit
      </MenuItem> */}
      <MenuItem
        // onClick={() => console.log(props.productId)}
        onClick={() => {
          if (token) {
            dispatch(deleteProduct({ token, productId: props.productId }));
          }
        }}
        sx={{
          color: '#d61327',
          '& svg': {
            color: '#d61327 !important',
          },
        }}
      >
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
        title={product.productName}
        subheader={parseDate(product.createdAt)}
        sx={{
          '& .MuiCardHeader-title': {
            fontSize: 20,
            fontWeight: 500,
            textTransform: 'capitalize',
          },
          '& .MuiCardHeader-subheader': {
            fontSize: 14,
          },
        }}
        action={
          <>
            <IconButton aria-label='more-icon' onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <CustomizedMenus
              open={open}
              anchorEl={anchorEl}
              handleClose={handleClose}
              productId={product._id}
            />
          </>
        }
      />
      <CardMedia
        component='img'
        height='240'
        image={product.imageUrl}
        alt={product.description}
        sx={{ objectFit: 'contain' }}
      />
      <CardActions disableSpacing>
        <Typography px={1} fontSize={20} fontWeight={700}>
          {parseNigerianNaira(product?.price)}
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
            <Typography
              fontWeight={400}
              component='span'
              textTransform='capitalize'
            >
              {product.productName}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700} textTransform='capitalize'>
            Description:{' '}
            <Typography fontWeight={400} component='span'>
              {product.description}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700}>
            Price:{' '}
            <Typography fontWeight={400} component='span'>
              {parseNigerianNaira(product?.price)}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700}>
            Date Added:{' '}
            <Typography fontWeight={400} component='span'>
              {parseDate(product.createdAt)}
            </Typography>
          </Typography>
          <Typography paragraph fontWeight={700}>
            Last Updated:{' '}
            <Typography fontWeight={400} component='span'>
              {parseDate(product.updatedAt)}
            </Typography>
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
