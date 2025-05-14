import React from "react";
import "./employeetimeentries.css";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PieChart, Pie, Cell } from "recharts";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

function SummaryCard({ item }) {
  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
    width: "30%",
  }));

  return (
    <StyledPaper>
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: item.color }}>
          {" "}
          <img src={item.icon} alt={item.label} />{" "}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">{item.label}</Typography>
          <Typography variant="h6">{item.value}</Typography>
        </Box>
      </Box>
    </StyledPaper>
  );
}

export default SummaryCard;
