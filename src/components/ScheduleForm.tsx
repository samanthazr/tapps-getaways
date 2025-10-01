import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Box, Paper, Typography, Button,
  TextField, Select, MenuItem, FormControl, FormHelperText,
  Table, TableBody, TableContainer, TableHead, TableRow,
  // InputLabel,
} from '@mui/material';
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { SelectChangeEvent } from '@mui/material/Select';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import type { ScheduleRow } from '../types/getaway';
import { compareTimes } from '../utils/dataMappers';
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

const daysOfWeek = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];

type RowError = {
  day?: string;
  startHour?: string;
  startMinute?: string;
  endHour?: string;
  endMinute?: string;
  activity?: string;
  location?: string;
  endPeriod?: string;
};

type ScheduleFormProps = {
  rows: ScheduleRow[];
  setRows: React.Dispatch<React.SetStateAction<ScheduleRow[]>>;
};

const hourOptions = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const minuteOptions = ["00", "15", "30", "45"];
const periodOptions = ["AM", "PM"];

export function ScheduleForm({ rows, setRows }: ScheduleFormProps) {
  const [activeForms, setActiveForms] = useState<ScheduleRow[]>([
    {
      id: Date.now(),
      day: "",
      startHour: "",
      startMinute: "",
      startPeriod: "AM",
      endHour: "",
      endMinute: "",
      endPeriod: "AM",
      activity: "",
      location: ""
    },
  ]);
  const [errors, setErrors] = useState<RowError[]>([{}]);
  const [touched, setTouched] = useState<boolean[]>([false]);

  function validateFormRow(form: ScheduleRow): RowError {
    const error: RowError = {};
    if (!form.day) error.day = "Required";
    if (!form.startHour) error.startHour = "Required";
    if (!form.startMinute) error.startMinute = "Required";
    if (!form.endHour) error.endHour = "Required";
    if (!form.endMinute) error.endMinute = "Required";
    if (
      form.startHour && form.startMinute && form.endHour && form.endMinute &&
      (!compareTimes(form.startHour, form.startMinute, form.startPeriod, form.endHour, form.endMinute, form.endPeriod))
    ) {
      error.endPeriod = "Must be after start time";
    }
    if (!form.activity) error.activity = "Required";
    if (!form.location) error.location = "Required";
    return error;
  }

  const handleFormChange = (
    idx: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    setActiveForms((forms) =>
      forms.map((form, i) =>
        i === idx ? { ...form, [name as string]: value as string } : form
      )
    );
    setTouched((prev) => prev.map((t, i) => (i === idx ? true : t)));
  };

  //form row
  const handleNewFormRow = () => {
    setActiveForms((forms) => [
      ...forms,
      {
        id: Date.now(),
        day: "",
        startHour: "",
        startMinute: "",
        startPeriod: "AM",
        endHour: "",
        endMinute: "",
        endPeriod: "AM",
        activity: "",
        location: ""
      }
    ]);
    setErrors((errs) => [...errs, {}]);
    setTouched((t) => [...t, false]);
  };

  const handleConfirmFormRow = (idx: number) => {
    const form = activeForms[idx];
    const validation = validateFormRow(form);
    setTouched((prev) => prev.map((t, i) => (i === idx ? true : t)));
    setErrors((errs) => errs.map((e, i) => (i === idx ? validation : e)));
    const isComplete = !!form.day && !!form.startHour && !!form.startMinute && !!form.endHour && !!form.endMinute && !!form.activity && !!form.location;
    const hasNoError = Object.values(validation).every((v) => !v);
    if (isComplete && hasNoError) {
      setRows((prev) => [...prev, form]);
      setActiveForms((forms) => forms.filter((_, i) => i !== idx));
      setErrors((errs) => errs.filter((_, i) => i !== idx));
      setTouched((t) => t.filter((_, i) => i !== idx));
    }
  };

  const handleRemoveRow = (idx: number) => {
    setRows((rows) => rows.filter((_, i) => i !== idx));
  };

  return (
    <Box>
      <Typography variant="body1" fontWeight="bold" color="#3C1C91"> Schedule </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell sx={{ p:'1 0 1 1', width:'90px', minWidth:'90px',}}> Day </StyledTableCell>
              <StyledTableCell sx={{ p:'0', pl:1, width: '110px' }}> Start time </StyledTableCell>
              <StyledTableCell sx={{ p:'0', minWidth: '50px' }}> End time </StyledTableCell>
              <StyledTableCell sx={{ p:'0', minWidth: '150px'}}> Activity </StyledTableCell>
              <StyledTableCell sx={{ p:'0', minWidth: '150px' }}> Location </StyledTableCell>
              <StyledTableCell sx={{ p:'0', width: '10px' }} align="center"></StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {activeForms.map((form, idx) => (
              <StyledTableRow
                key={form.id}
              >
                <StyledTableCell sx={{ p:'0 2px 0 10px' }} >
                  <FormControl fullWidth size="small" error={!!(touched[idx] && errors[idx]?.day)}>
                    {/* <InputLabel id={`day-label-${idx}`}>  Day </InputLabel> */}
                    <Select name="day" sx={{ width: 132, pr:'0' }}
                      label="Day"
                      labelId={`day-label-${idx}`}
                      value={form.day}
                      onChange={e => handleFormChange(idx, e)}
                      // required
                    >
                      <MenuItem value="">Select day</MenuItem>
                      {daysOfWeek.map(day => (
                        <MenuItem key={day} value={day}>{day}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {/* {errors[idx]?.day || " "} */}
                      {touched[idx] && errors[idx]?.day ? errors[idx]?.day : " "}
                    </FormHelperText>
                  </FormControl>
                </StyledTableCell>

                {/* Start time */}
                <StyledTableCell sx={{ padding:'0 5px 0 5px'}} >
                  <Box sx={{ display: 'flex', alignItems: 'start' }}>
                    <FormControl size="small" sx={{ width: 60, minHeight: 60 }} error={!!(touched[idx] && errors[idx]?.startHour)}>
                      <Select name="startHour" displayEmpty sx={{ borderRadius: '10px 0 0 10px'}}
                        value={form.startHour}
                        onChange={e => handleFormChange(idx, e)}
                        //required
                      >
                        <MenuItem value="">Hr</MenuItem>
                        {hourOptions.map(hr => (
                          <MenuItem key={hr} value={hr}>{hr}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ maxWidth:70, minHeight:60 }}
                      // error={!!errors[idx]?.startMinute}>
                      error={!!(touched[idx] && errors[idx]?.startMinute)}>
                      <Select name="startMinute" displayEmpty sx={{ borderRadius:'0px'}}
                        value={form.startMinute}
                        onChange={e => handleFormChange(idx, e)}
                        // required
                      >
                        <MenuItem value="">Min</MenuItem>
                        {minuteOptions.map(min => (
                          <MenuItem key={min} value={min}>{min}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minHeight:60 }}>
                      <Select name="startPeriod" sx={{ width:'73px', pl:0, borderRadius:'0px 10px 10px 0' }}
                        value={form.startPeriod}
                        onChange={e => handleFormChange(idx, e)}
                      >
                        {periodOptions.map(p => (
                          <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <FormHelperText sx={{ color:"#df1010ff", lineHeight:'0.1px', display:'block'}}>
                    {touched[idx] && (errors[idx]?.startHour || errors[idx]?.startMinute)
                      ? (errors[idx]?.startHour || errors[idx]?.startMinute)
                      : " "
                      }
                  </FormHelperText>
                </StyledTableCell>

                {/* End time */}
                <StyledTableCell sx={{ pl:'0', pr:'1px'}}>
                  <Box sx={{ display: 'flex', alignItems: 'start' }}>
                    <FormControl size="small" sx={{ width: 60, minHeight: 60 }}
                      error={!!(touched[idx] && errors[idx]?.endHour)}
                      >
                      <Select name="endHour" displayEmpty sx={{ borderRadius: '10px 0 0 10px'}}
                        value={form.endHour}
                        onChange={e => handleFormChange(idx, e)}
                        // required
                      >
                        <MenuItem value="">Hr</MenuItem>
                        {hourOptions.map(hr => (
                          <MenuItem key={hr} value={hr}>{hr}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ maxWidth:70, minHeight:60, p:0 }}
                      error={!!(touched[idx] && errors[idx]?.endMinute)}
                      >
                      <Select name="endMinute" displayEmpty sx={{ borderRadius:'0px' }}
                        value={form.endMinute}
                        onChange={e => handleFormChange(idx, e)}
                        // required
                      >
                        <MenuItem value="">Min</MenuItem>
                        {minuteOptions.map(min => (
                          <MenuItem key={min} value={min}>{min}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ width: 73, minHeight: 60 }}
                      error={!!(touched[idx] && errors[idx]?.endPeriod)}
                      >
                      <Select name="endPeriod" sx={{ width:'73px', pl:0, p:0, borderRadius: '0px 10px 10px 0'}}
                        value={form.endPeriod}
                        onChange={e => handleFormChange(idx, e)}
                        // required
                      >
                        {periodOptions.map(p => (
                          <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <FormHelperText sx={{ color:"#df1010ff", lineHeight:'0.1px', display:'block', p:0, }}>
                    {touched[idx] && errors[idx]?.endPeriod ? errors[idx]?.endPeriod : " "}
                  </FormHelperText>
                </StyledTableCell>
                <StyledTableCell sx={{ p:'0 3px 0 0' }}>
                  <TextField size="small" fullWidth sx={{ width:'160px'}}
                    name="activity" placeholder="Activity title"
                    value={form.activity}
                    onChange={e => handleFormChange(idx, e)}
                    // error={!!errors[idx]?.activity}
                    // helperText={errors[idx]?.activity || " "}
                    error={!!(touched[idx] && errors[idx]?.activity)}
                    helperText={touched[idx] && errors[idx]?.activity ? errors[idx]?.activity : " "}
                    // required
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ width:'150px', pl:0}}>
                  <TextField size="small" fullWidth sx={{ width:'160px', padding:'0 1px 0 0'}}
                    name="location" placeholder="Location"
                    value={form.location}
                    onChange={e => handleFormChange(idx, e)}
                    // error={!!errors[idx]?.location}
                    // helperText={errors[idx]?.location || " "}
                    error={!!(touched[idx] && errors[idx]?.location)}
                    helperText={touched[idx] && errors[idx]?.location ? errors[idx]?.location : " "}
                    // required
                  />
                </StyledTableCell>
                <StyledTableCell sx={{ pl:'0' }} align="center">
                  <Button variant="contained" color="primary" size="small" aria-label="save"
                    sx={{ borderRadius:'20px', textTransform:'none', fontWeight:'bold', bgcolor: '#3C1C91',  color: '#fff', ':hover': { color: '#3C1C91', bgcolor: '#fff'}}}
                    onClick={() => handleConfirmFormRow(idx)}
                  > Save </Button>
                  {/* <IconButton onClick={() => handleRemoveFormRow(idx)} aria-label="delete"> */}
                  {/* <IconButton onClick={() => handleRemoveRow(idx)} aria-label="delete">
                    <DeleteIcon/>
                  </IconButton> */}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            {rows.map((row, idx) => (
              <TableRow key={`row-${idx}`}>
                <StyledTableCell>{row.day}</StyledTableCell>
                <StyledTableCell>
                  {row.startHour}:{row.startMinute} {row.startPeriod}
                </StyledTableCell>
                <StyledTableCell>
                  {row.endHour}:{row.endMinute} {row.endPeriod}
                </StyledTableCell>
                <StyledTableCell>{row.activity}</StyledTableCell>
                <StyledTableCell>{row.location}</StyledTableCell>
                <StyledTableCell align="center" sx={{ p:0.6 }}>
                  <IconButton onClick={() => handleRemoveRow(idx)} aria-label="delete"><DeleteIcon/></IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display:"flex", gap:2, mt:1 }}>
        <Button startIcon={<AddIcon />} variant="outlined" disableElevation
          onClick={handleNewFormRow}
          sx={{
            color:'#1A2660', bgcolor:'#00E392', borderRadius:'30px', fontWeight:'bold', textTransform:'none',
            ':hover': { bgcolor:'#3C1C91', color:'white' }
          }}
        > Add day </Button>
      </Box>
    </Box>
  );
}