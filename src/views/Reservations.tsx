import React, { useState, useEffect } from 'react';
import {
  Box, Link, Button, Dialog, DialogTitle, DialogContent, IconButton, Typography, Divider
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AdminSideBar from '../components/AdminSidebar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  playerName: string,
  city: string,
  paymentState: string,
  price: number,
  whatsappLink: string,
) {
  return { playerName, city, paymentState, price, whatsappLink };
}

const rows = [
  createData('Joe Doe', 'Miami', 'Pending', 240, 'wa.me/59178326628'),
  createData('Ann Taylor', 'Las Palmas', 'Approved', 370, 'wa.me/1+number'),
  createData('Alan Smith', 'Miami', 'Rejected', 240.5, 'wa.me/+number'),
];

interface RowData {
  playerName: string;
  city: string;
  paymentState: string;
  price: number;
  whatsappLink: string;
}

interface SelectedData {
  lodgingOption: string;
  amenities: {
    specialDinner: boolean;
    meetGreet: boolean;
    tennisClass: boolean;
  };
  taxes: number;
  total: number;
}


function Reservations() {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RowData | null>(null);
  const [selectedData, setSelectedData] = useState<SelectedData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem('selectedData');
    if (data) {
      setSelectedData(JSON.parse(data));
    }
  }, []);

  const handleOpenDialog = (row: RowData) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  return (
    <>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }} mt={9}>
        <AdminSideBar />
        <Grid size={{ xs: 10 }} spacing={2} justifyContent="center" className="section blueBg">
          <Box>
            <h3>Getaway's players list</h3>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Player's name</StyledTableCell>
                  <StyledTableCell align="left">City</StyledTableCell>
                  <StyledTableCell align="left">Payment state</StyledTableCell>
                  <StyledTableCell align="right">Price&nbsp;($)</StyledTableCell>
                  <StyledTableCell align="left">Whatsapp contact</StyledTableCell>
                  <StyledTableCell align="center">Sale detail</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.playerName}>
                    <StyledTableCell component="th" scope="row">
                      {row.playerName}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.city}</StyledTableCell>
                    <StyledTableCell align="left">{row.paymentState}</StyledTableCell>
                    <StyledTableCell align="right">{row.price}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Link target="_blank" href={`https://${row.whatsappLink}`}>
                        {row.whatsappLink}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        onClick={() => handleOpenDialog(row)}
                        sx={{
                          padding: '0px 18px 0px 9px',
                          bgcolor: '#3C1C91', color: '#FFF', fontWeight: 'medium', textTransform: 'none',
                        }}
                      >
                        <IconButton aria-label="add" sx={{ color: "#fff" }}>
                          <CreditCardIcon />
                        </IconButton>
                        Sale details
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      {/* Modal de recibo */}
      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <center>
            <Typography variant="subtitle1">Sale Details</Typography>
          </center>
          <IconButton
            aria-label="close"
            onClick={handleCloseDialog}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedRow && selectedData && (
            <>
              <Typography variant="body1">Player's name: {selectedRow.playerName}</Typography>
              <Typography variant="body1">Lodging option: {selectedData.lodgingOption}</Typography>
              <Typography variant="body1">
                Add Ons:
                {selectedData.amenities.specialDinner && ' Special Dinner,'}
                {selectedData.amenities.meetGreet && ' Meet & Greet,'}
                {selectedData.amenities.tennisClass && ' Tennis Class'}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1">Payment details</Typography>
              <Typography variant="body1">Taxes: ${selectedData.taxes.toFixed(2)}</Typography>
              <Typography variant="body1">Total: ${selectedData.total.toFixed(2)}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Reservations;