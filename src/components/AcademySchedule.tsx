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

//type for tournament row
export interface TournamentRow {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  location: string;
  court: string;
  trainers: string;
  price: number;
  priceLabel: string;
  included: boolean;
}

const initialRows: TournamentRow[] = [
  {
    id: 1,
    day: "Saturday",
    startTime: "10:00",
    endTime: "12:00",
    location: "Salitre",
    court: "Cancha #4",
    trainers: "E. Panche",
    price: 0,
    priceLabel: "Included in Getaway™",
    included: true,
  },
  {
    id: 2,
    day: "Saturday",
    startTime: "12:00",
    endTime: "13:00",
    location: "Salitre",
    court: "Cancha #2",
    trainers: "E. Panche",
    price: 60,
    priceLabel: "/ Per person",
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

export default function AcademySchedule() {
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
            <StyledTableCell align="left">Weekday</StyledTableCell>
            <StyledTableCell align="left">Location</StyledTableCell>
            <StyledTableCell align="left">Trainer</StyledTableCell>
            <StyledTableCell align="left">Price</StyledTableCell>
            <StyledTableCell align="center">Include</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                <Stack direction="column" spacing={0.5}>
                  <strong>{row.day}</strong>
                  <span>{row.startTime}</span>
                  <span>{row.endTime}</span>
                </Stack>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Stack direction="column" spacing={0.5}>
                  <strong>{row.location}</strong>
                  <span>Court: {row.court}</span>
                </Stack>
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Stack direction="column" spacing={0.5}>
                  <span>{row.trainers}</span>
                </Stack>
              </StyledTableCell>
              <StyledTableCell align="left" component="th" scope="row">
                <Stack direction="column" spacing={0.5}>
                  <span>{row.price}$</span>
                  <span>{row.priceLabel}</span>
                </Stack>
              </StyledTableCell>
              <StyledTableCell align="center">
                <input
                  type="checkbox"
                  checked={row.included}
                  onChange={() => handleIncludeChange(row.id)}
                  // aria-label={`Include ${row.tournamentName}`}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}