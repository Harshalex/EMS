import React, { useState, useEffect } from "react";
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
  useGetActiveTimerQuery,
  useGetTimeEntriesQuery,
  useStartTimerMutation,
  useStopTimerMutation,
} from "../../../redux/api/timeEntryApiSlice.js";
import { useGetProjectsQuery } from "../../../redux/api/projectApiSlice.js";
import { getWeekStart } from "../../../utils/getWeekStart.js";

// Utility function to format elapsed time (e.g., "00:01:23")
const formatElapsedTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

const EmployeeDashboard = () => {
  const [selectedProject, setSelectedProject] = useState("");
  const [description, setDescription] = useState("");
  const [elapsedTime, setElapsedTime] = useState(0); // For live timer

  // Calculate the start of the current week (Monday)
  const weekStart = getWeekStart(); // "2025-05-12" (since today is May 13, 2025)

  // Fetch projects for the dropdown
  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useGetProjectsQuery();
  console.log("Projects Data:************", projectsData?.result);
  console.log("Projects Error:", projectsError);

  // Handle project options with safety check
  const projectoptions = Array.isArray(projectsData?.result)
    ? projectsData.result.map((project) => ({
        value: project?._id || "",
        label: project?.projectName || "Unknown Project",
      }))
    : [];
  console.log(
    "These are the Project Options we fetched************",
    projectoptions
  );

  // Fetch the active timer (if any)
  const {
    data: activeTimerData,
    isLoading: activeTimerLoading,
    error: activeTimerError,
  } = useGetActiveTimerQuery();
  console.log("Active Timer Data:", activeTimerData);
  console.log("Active Timer Error:", activeTimerError);
  const activeTimer = activeTimerData?.entries?.[0]; // First running timer (if exists)

  // Fetch recent time entries for the current week
  const { data: timeEntriesData, isLoading: timeEntriesLoading } =
    useGetTimeEntriesQuery(weekStart);
  const entries = timeEntriesData?.entries || [];

  // Mutations for starting and stopping the timer
  const [startTimer, { isLoading: startTimerLoading }] =
    useStartTimerMutation();
  const [stopTimer, { isLoading: stopTimerLoading }] = useStopTimerMutation();

  // Live timer effect: Update elapsed time every second if there's an active timer
  useEffect(() => {
    if (!activeTimer || !activeTimer.startTime) {
      setElapsedTime(0);
      return;
    }

    console.log("Active Timer Start Time:", activeTimer.startTime);
    const startTime = new Date(activeTimer.startTime).getTime();
    if (isNaN(startTime)) {
      console.error("Invalid start time:", activeTimer.startTime);
      setElapsedTime(0);
      return;
    }

    const interval = setInterval(() => {
      const currentTime = new Date().getTime();
      const seconds = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(seconds);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount or when activeTimer changes
  }, [activeTimer]);

  // Handle Start button click
  const handleStart = async () => {
    if (!selectedProject) {
      alert("Please select a project to start the timer.");
      return;
    }

    try {
      const response = await startTimer({
        project: selectedProject,
        description,
        activityType: "Productive",
      }).unwrap();
      console.log("Start Timer Response:", response);
      setDescription(""); // Clear description after starting
    } catch (error) {
      console.error("Failed to start timer:", error);
      alert("Failed to start timer. Please try again.");
    }
  };

  // Handle Stop button click
  const handleStop = async () => {
    if (!activeTimer) return;

    try {
      const response = await stopTimer(activeTimer.id).unwrap();
      console.log("Stop Timer Response:", response);
    } catch (error) {
      console.error("Failed to stop timer:", error);
      alert("Failed to stop timer. Please try again.");
    }
  };

  // Format entries for the DataTable
  const formattedEntries = entries.map((entry) => ({
    id: entry.id,
    date: new Date(entry.date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
    project: entry.project?.projectName || "Unknown Project",
    timeRange: entry.endTime
      ? `${new Date(entry.startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })} – ${new Date(entry.endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}`
      : "Running",
    hours: entry.status === "Completed" ? entry.duration.toFixed(2) : "N/A",
  }));

  const entriesColumns = [
    {
      title: "Date",
      render: (e) => <p className="semi-font-bold">{e.date}</p>,
    },
    {
      title: "Project",
      render: (e) => <p className="semi-font-bold">{e.project}</p>,
    },
    {
      title: "Time Range",
      render: (e) => <p className="semi-font-bold">{e.timeRange}</p>,
    },
    {
      title: "Hours",
      render: (e) => <p className="semi-font-bold">{e.hours}</p>,
    },
  ];

  // Handle loading and error states for projects
  if (projectsLoading) {
    return <Typography>Loading projects...</Typography>;
  }

  if (projectsError) {
    return (
      <Typography color="error">
        Failed to load projects:{" "}
        {projectsError?.data?.message || "Unknown error"}
      </Typography>
    );
  }

  // Handle loading and error states for active timer
  if (activeTimerLoading) {
    return <Typography>Loading active timer...</Typography>;
  }

  if (activeTimerError) {
    return (
      <Typography color="error">
        Failed to load active timer:{" "}
        {activeTimerError?.data?.message || "Unknown error"}
      </Typography>
    );
  }

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
                onChange={(e) => setSelectedProject(e.target.value)}
                options={projectoptions}
                disabled={projectsLoading || activeTimer} // Disable if a timer is running
              />
            </div>

            <div className="time-section">
              {activeTimer ? (
                <>
                  <Typography variant="body1" sx={{ marginRight: 2 }}>
                    Elapsed Time: {formatElapsedTime(elapsedTime)}
                  </Typography>
                  <CustomButton
                    text="Stop"
                    customstyle="stop-btn"
                    onClick={handleStop}
                    disabled={stopTimerLoading}
                  />
                </>
              ) : (
                <CustomButton
                  text="Start"
                  customstyle="start-btn"
                  onClick={handleStart}
                  disabled={startTimerLoading || !selectedProject}
                />
              )}
            </div>
          </div>

          <TextField
            fullWidth
            placeholder="Working on dashboard components and API Integration..."
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

      {/* Recent Time Entries Section */}
      <h4 className="my-4">Recent Time Entries</h4>
      {timeEntriesLoading ? (
        <Typography>Loading time entries...</Typography>
      ) : (
        <DataTable columns={entriesColumns} data={formattedEntries} />
      )}
    </div>
  );
};

export default EmployeeDashboard;
