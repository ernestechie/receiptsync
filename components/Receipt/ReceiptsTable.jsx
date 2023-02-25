import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell
          component='th'
          scope='row'
          onClick={() => setOpen(!open)}
          sx={{ cursor: 'pointer', fontWeight: 600 }}
        >
          #{row.receiptNumber.toUpperCase()}
        </TableCell>
        <TableCell align='right'>{'2023'}</TableCell>
        <TableCell align='right'>{row.customer.name}</TableCell>
        <TableCell align='right' sx={{ fontWeight: 600 }}>
          N{row.totalPrice.toLocaleString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                Receipt Details
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
                    <TableCell align='right'>Total (N)</TableCell>
                  </TableRow>
                </TableHead>
                {/* <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody> */}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function ReceiptsTable({ receipts }) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='collapsible table'>
        {/* <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
              Issue ID
            </TableCell>
            <TableCell
              align='right'
              sx={{ fontWeight: 700, textTransform: 'uppercase' }}
            >
              Date
            </TableCell>
            <TableCell
              align='right'
              sx={{ fontWeight: 700, textTransform: 'uppercase' }}
            >
              Customer
            </TableCell>
            <TableCell
              align='right'
              sx={{ fontWeight: 700, textTransform: 'uppercase' }}
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {receipts.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
