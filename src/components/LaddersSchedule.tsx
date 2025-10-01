import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Divider, Paper, Stack } from '@mui/material';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import laddersLogo from '../assets/RappsIcons/laddersLogo.svg';
//ladder row
export interface LadderRow {
  id: number;
  tournamentName: string;
  location: string;
  dates: string;
  rankingType: string;
  modality: string;
  price: string;
  included: boolean;
}

const initialRows: LadderRow[] = [
  {
    id: 1,
    tournamentName: "Nombre Torneo",
    location: "Sede",
    dates: "14/12/25 - 15/12/25",
    rankingType: "A",
    modality: "singles",
    price: "Included in Getaway™",
    included: false,
  },
  {
    id: 2,
    tournamentName: "Nombre Torneo",
    location: "Sede",
    dates: "14/12/25 - 15/12/25",
    rankingType: "A",
    modality: "singles",
    price: "237$ per person",
    included: false,
  },
];

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
  backgroundColor: '#fff',
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function LaddersTable() {
  const [rows, setRows] = React.useState<LadderRow[]>(initialRows);

  const handleIncludeChange = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, included: !row.included } : row
      )
    );
  };

  return (
    <Box sx={{ width:'100%', margin:'25px 0' }}>
      <Divider textAlign="center" aria-hidden="true">
        <img src={laddersLogo} style={{height:'36px'}} className="logo" alt="Racquets Ladders Logo" />
      </Divider>
      <p>You can add this available Ladders&trade; sessions in this Getaway&trade;</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth:700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Ladders Tournament</StyledTableCell>
              <StyledTableCell align="left">Price</StyledTableCell>
              <StyledTableCell align="center">Include</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <Stack direction="column" spacing={0.5}>
                    <strong>{row.tournamentName} | {row.location}</strong>
                    <span>Fechas: {row.dates}</span>
                    <span>Tipo ranking: {row.rankingType}</span>
                    <span>Modalidad: {row.modality}</span>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell align="left">{row.price}</StyledTableCell>
                <StyledTableCell align="center">
                  <input id={`ladderOption-${row.id}`} 
                    type="checkbox"
                    checked={row.included}
                    onChange={() => handleIncludeChange(row.id)}
                    aria-label={`Include ${row.tournamentName}`}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}