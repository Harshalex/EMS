// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const apiSlice = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.43:5000' }), 
//   tagTypes: ['Employees', 'Projects', 'TimeEntries', 'Reports'],
//   endpoints: (builder) => ({
//     // Employee Endpoints (Admin)
//     getEmployees: builder.query({
//       query: ({ page = 1, department = 'all' }) => `employees?page=${page}&department=${department}`,
//       providesTags: ['Employees'],
//     }),
//     addEmployee: builder.mutation({
//       query: (employee) => ({
//         url: 'employees',
//         method: 'POST',
//         body: employee,
//       }),
//       invalidatesTags: ['Employees'],
//     }),
//     updateEmployee: builder.mutation({
//       query: ({ id, ...employee }) => ({
//         url: `employees/${id}`,
//         method: 'PUT',
//         body: employee,
//       }),
//       invalidatesTags: ['Employees'],
//     }),
//     deleteEmployee: builder.mutation({
//       query: (id) => ({
//         url: `employees/${id}`,
//         method: 'DELETE',
//       }),
//       invalidatesTags: ['Employees'],
//     }),

//     // Project Endpoints (Admin and Employee)
//     getProjects: builder.query({
//       query: ({ page = 1, status = 'all' }) => `projects?page=${page}&status=${status}`,
//       providesTags: ['Projects'],
//     }),
//     getMyProjects: builder.query({
//       query: () => 'projects/my',
//       providesTags: ['Projects'],
//     }),
//     addProject: builder.mutation({
//       query: (project) => ({
//         url: 'projects',
//         method: 'POST',
//         body: project,
//       }),
//       invalidatesTags: ['Projects'],
//     }),
//     updateProject: builder.mutation({
//       query: ({ id, ...project }) => ({
//         url: `projects/${id}`,
//         method: 'PUT',
//         body: project,
//       }),
//       invalidatesTags: ['Projects'],
//     }),

//     // Time Entry Endpoints (Employee)
//     getTimeEntries: builder.query({
//       query: () => 'time-entries',
//       providesTags: ['TimeEntries'],
//     }),
//     addTimeEntry: builder.mutation({
//       query: (timeEntry) => ({
//         url: 'time-entries',
//         method: 'POST',
//         body: timeEntry,
//       }),
//       invalidatesTags: ['TimeEntries', 'Reports'],
//     }),
//     updateTimeEntry: builder.mutation({
//       query: ({ id, ...timeEntry }) => ({
//         url: `time-entries/${id}`,
//         method: 'PUT',
//         body: timeEntry,
//       }),
//       invalidatesTags: ['TimeEntries', 'Reports'],
//     }),

//     // Report Endpoints (Admin and Employee)
//     getDashboardData: builder.query({
//       query: () => 'reports/dashboard',
//       providesTags: ['Reports'],
//     }),
//     getTimeReports: builder.query({
//       query: ({ startDate, endDate, project, employee }) =>
//         `reports/time?startDate=${startDate}&endDate=${endDate}&project=${project}&employee=${employee}`,
//       providesTags: ['Reports'],
//     }),
//     getWeeklyActivity: builder.query({
//       query: (week) => `reports/weekly?week=${week}`,
//       providesTags: ['Reports'],
//     }),
//   }),
// });

// export const {
//   useGetEmployeesQuery,
//   useAddEmployeeMutation,
//   useUpdateEmployeeMutation,
//   useDeleteEmployeeMutation,
//   useGetProjectsQuery,
//   useGetMyProjectsQuery,
//   useAddProjectMutation,
//   useUpdateProjectMutation,
//   useGetTimeEntriesQuery,   
//   useAddTimeEntryMutation,
//   useUpdateTimeEntryMutation,
//   useGetDashboardDataQuery,
//   useGetTimeReportsQuery,
//   useGetWeeklyActivityQuery,
// } = apiSlice;

// Export hooks for usage in components
// export const {
//   useGetEmployeeProjectsQuery,
//   useStartTimeTrackingMutation,
//   useStopTimeTrackingMutation,
//   useGetWeeklyActivityQuery,
// } = apiSlice;