import React, { useState } from "react";
import { Box, Typography, TextField, Menu, MenuItem } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { format } from "date-fns";

const DateRange = () => {
  const [startDate, setStartDate] = useState(new Date("2025-05-01"));
  const [endDate, setEndDate] = useState(new Date("2025-06-15"));
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatLabel = (start, end) => {
    if (!start || !end) return "Select date range";
    return `${format(start, "MMMM d, yyyy")} - ${format(end, "MMMM d, yyyy")}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: 2,
          p: 1.5,
          width: "100%",
          cursor: "pointer",
        }}
        onClick={handleOpen}
      >
        <CalendarTodayIcon fontSize="small" sx={{ mr: 1 }} />
        <TextField
          variant="standard"
          value={formatLabel(startDate, endDate)}
          InputProps={{
            disableUnderline: true,
            readOnly: true,
            sx: { cursor: "pointer", width: "100%" },
          }}
        />
      </Box>

      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem disableRipple>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newDate) => newDate && setStartDate(newDate)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </MenuItem>
        <MenuItem disableRipple>
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newDate) => newDate && setEndDate(newDate)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
        </MenuItem>
      </Menu>
    </LocalizationProvider>
  );
};

export default DateRange;
