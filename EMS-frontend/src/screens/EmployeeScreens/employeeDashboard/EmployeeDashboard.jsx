import React, { useEffect, useState } from "react";
import "./employeedashboard.css";
import CustomButton from "../../../components/CustomButton.jsx";
import {
  TextField,
  InputAdornment,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CustomSelect from "../../../components/CustomSelect";
import DataTable from "../../../components/Datatable.jsx";
import {
  useGetCurrentTimeQuery,
  useStartTimerMutation,
  useStopTimerMutation,
  useGetSingleUserTimeEntriesQuery,
} from "../../../redux/api/timeEntryApiSlice.js";
import { useGetProjectsQuery } from "../../../redux/api/projectApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProject,
  startTimerSuccess,
  stopTimerSuccess,
  clearTimerState,
} from "../../../redux/slices/timerSlice.js";

const EmployeeDashboard = () => {
  const dispatch = useDispatch();
  const { selectedProject, timeEntryId, isTimerRunning } = useSelector(
    (state) => state.timer
  );

  const [description, setDescription] = useState("");
  const { data: timeData } = useGetCurrentTimeQuery();
  const [startTimer] = useStartTimerMutation();
  const [stopTimer] = useStopTimerMutation();

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useGetProjectsQuery();

  const { data: timeEntriesData, isLoading: entriesLoading } =
    useGetSingleUserTimeEntriesQuery();

  const projectOptions = Array.isArray(projectsData?.result)
    ? projectsData.result.map((project) => ({
        value: project?._id || "",
        label: project?.projectName || "Unknown Project",
      }))
    : [];

  useEffect(() => {
    if (timeData?.result?.time) {
      const [hours, minutes] = timeData.result.time.split(":");
      const formattedTime = `${hours}:${minutes}`;
      setStartTime(formattedTime);
      setEndTime(formattedTime);
    }
  }, [timeData]);

  const handleStart = async () => {
    const payload = {
      project: selectedProject,
      description: description,
      activityType: "Productive",
    };
    try {
      const response = await startTimer(payload).unwrap();
      if (response?.result?.id) {
        dispatch(startTimerSuccess(response.result.id)); // Store raw timeEntryId
      }
    } catch (error) {
      console.error("Start timer API error:", error);
      toast.error("Failed to start timer. Please try again.");
      alert("Failed to start timer. Please try again."); // Basic feedback
    }
  };

  const handleStop = async () => {
    if (!timeEntryId) {
      alert("No active timer to stop.");
      return;
    }

    try {
      await stopTimer(timeEntryId).unwrap(); // Send raw timeEntryId
      dispatch(clearTimerState()); // Reset state
    } catch (error) {
      console.error("Stop timer API error:", error);
      toast.error("Failed to start timer. Please try again.");
      alert("Failed to stop timer. Please try again.");
    }
  };
  console.log(timeEntriesData);
  const entries =
    timeEntriesData?.entries?.map((entry) => ({
      date: entry?.date || "N/A",
      project: entry?.project?.projectName || "Unknown",
      timeRange: `${
        entry.startTime?.time?.split(":").slice(0, 2).join(":") || "N/A"
      } - ${
        entry.endTime?.time?.split(":").slice(0, 2).join(":") || "Ongoing"
      }`,
      hours: entry.duration != null ? entry.duration.toFixed(2) : "N/A",
    })) || [];
  // const entries = [];

  const entriesColumns = [
    {
      title: "Date",
      render: (e) => {
        const date = e.date ? e.date.date : "N/A";
        const time = e.date && e.date.time ? ` ${e.date.time}` : "";
        return <p className="semi-font-bold">{`${date}`}</p>;
      },
    },
    {
      title: "Project",
      render: (e) => <p className="semi-font-bold">{e.project || "Unknown"}</p>,
    },
    {
      title: "Time Range",
      render: (e) => {
        const timeRange = e.timeRange ? e.timeRange : "N/A";
        return <p className="semi-font-bold">{timeRange}</p>;
      },
    },
    {
      title: "Hours",
      render: (e) => {
        const hours = e.hours ? e.hours : "0";
        return <p className="semi-font-bold">{hours}</p>;
      },
    },
  ];

  return (
    <div className="emp-container">
      <div className="emp-head">
        <h3>Welcome, John Doe</h3>
        <h6 className="my-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h6>
      </div>
      <Card>
        <CardContent>
          <div className="emp-dashboard-top">
            <div className="project-section">
              <CustomSelect
                className="py-3"
                value={selectedProject}
                disabled={isTimerRunning}
                onChange={(e) => dispatch(setSelectedProject(e.target.value))}
                options={projectOptions}
              />
            </div>

            <div className="time-section">
              <TextField
                label="Start Time"
                type="text"
                disabled
                fullWidth
                value={startTime}
              />
              <Typography>to</Typography>
              <TextField
                label="End Time"
                type="text"
                fullWidth
                value={endTime}
                disabled
              />
              {isTimerRunning ? (
                <CustomButton
                  text="Stop"
                  customstyle="stop-btn"
                  onClick={handleStop}
                />
              ) : (
                <CustomButton
                  text="Start"
                  customstyle="start-btn"
                  onClick={handleStart}
                  disabled={!selectedProject}
                />
              )}
            </div>
          </div>
          <TextField
            fullWidth
            placeholder="Working on dashboard components and API Integration....."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "rgba(238, 238, 240, 1)",
              },
            }}
          />
        </CardContent>
      </Card>
      <h4 className="my-4">Recent Time Entries</h4>
      <DataTable columns={entriesColumns} data={entries} />
    </div>
  );
};

export default EmployeeDashboard;
