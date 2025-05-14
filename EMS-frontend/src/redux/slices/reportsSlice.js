import { createSlice } from '@reduxjs/toolkit';

const reportsSlice = createSlice({
  name: 'reports',
  initialState: {
    dateRange: {
      startDate: '2025-05-01',
      endDate: '2025-05-21',
    },
    projectFilter: 'all',
    employeeFilter: 'all',
  },
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setProjectFilter: (state, action) => {
      state.projectFilter = action.payload;
    },
    setEmployeeFilter: (state, action) => {
      state.employeeFilter = action.payload;
    },
  },
});

export const { setDateRange, setProjectFilter, setEmployeeFilter } = reportsSlice.actions;
export default reportsSlice.reducer;