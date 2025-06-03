import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
export interface TournamentRow {
  id: number;
  tournamentName: string;
  location: string;
  dates: string;
  rankingType: string;
  modality: string;
  price: string;
  included: boolean;
}

const initialRows: TournamentRow[] = [
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

export default function LaddersSchedule() {
  const [rows, setRows] = React.useState<TournamentRow[]>(initialRows);

  const handleIncludeChange = (id: number) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, included: !row.included } : row
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Ladder</StyledTableCell>
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
                <input
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
  );
}