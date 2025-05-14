import "./employeeproject.css";

import {
  Box,
  Grid,
  Typography,
  LinearProgress,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { flex, styled } from "@mui/system";
import CustomButton from "../../../components/CustomButton";

const TeamAvatars = ({ count }) => (
  <Box display="flex" alignItems="center" mt={2}>
    {[...Array(count)].map((_, i) => (
      <Avatar
        key={i}
        src={`https://i.pravatar.cc/150?img=${i + 1}`}
        sx={{ width: 30, height: 30, ml: i === 0 ? 0 : -1 }}
      />
    ))}
    <Avatar sx={{ width: 30, height: 30, ml: -1, fontSize: 14 }}>+</Avatar>
  </Box>
);

const ProgressText = styled(Typography)(({ theme }) => ({
  position: "absolute",
  right: 0,
  top: -24,
  fontWeight: 500,
  fontSize: 14,
}));
const ProjectCard = ({
  title,
  client,
  hours,
  status,
  substatus,
  progress,
  color,
}) => (
  <div className="project-card">
    <Typography variant="h6" fontWeight={600} mb={1}>
      {title}
    </Typography>
    <Typography variant="body2">Client : {client}</Typography>
    <Typography variant="body2">Hours this month : {hours}</Typography>
    <Typography variant="body2">Status : {status}</Typography>

    {/* <Button
      size="small"
      variant="contained"
      sx={{
        bgcolor: "#FACC15",
        color: "#000",
        textTransform: "none",
        mb: 2,
        ms: "auto",
      }}
    >
      Track Time
    </Button> */}
    <div className="btn-div">
      <Typography variant="body2" mb={1}>
        {substatus}
      </Typography>
      <CustomButton text={"Track Time"} customstyle={"track-time-btn"} />
    </div>
    <Box position="relative">
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 5,
          backgroundColor: "#E0E0E0",
          "& .MuiLinearProgress-bar": { backgroundColor: color },
        }}
      />
      <ProgressText>{progress}%</ProgressText>
    </Box>
    <TeamAvatars count={4} />
  </div>
);

export default ProjectCard;
