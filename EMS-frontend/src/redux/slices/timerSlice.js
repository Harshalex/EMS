import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProject: "",
  timeEntryId: null,
  isTimerRunning: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload;
    },
    startTimerSuccess: (state, action) => {
      state.timeEntryId = action.payload; // Store raw timeEntryId
      state.isTimerRunning = true;
    },
    stopTimerSuccess: (state) => {
      state.timeEntryId = null;
      state.isTimerRunning = false;
      state.selectedProject = ""; // Reset project
    },
    clearTimerState: (state) => {
      state.selectedProject = "";
      state.timeEntryId = null;
      state.isTimerRunning = false;
    },
  },
});

export const {
  setSelectedProject,
  startTimerSuccess,
  stopTimerSuccess,
  clearTimerState,
} = timerSlice.actions;

export default timerSlice.reducer;