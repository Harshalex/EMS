import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    currentPage: 1,
    departmentFilter: 'all',
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setDepartmentFilter: (state, action) => {
      state.departmentFilter = action.payload;
    },
  },
});

export const { setCurrentPage, setDepartmentFilter } = employeeSlice.actions;
export default employeeSlice.reducer;