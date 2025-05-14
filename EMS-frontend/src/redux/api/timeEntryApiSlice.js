import { createApi } from '@reduxjs/toolkit/query/react';
import { sharedBaseQuery } from './sharedBaseQuery';

export const timeEntryApi = createApi({
  reducerPath: 'timeEntryApi',
  baseQuery: sharedBaseQuery,
  tagTypes: ['TimeEntries', 'TimeEntryStats'],
  endpoints: (builder) => ({
    getActiveTimer: builder.query({
      query: () => ({
        url: '/time-entries',
        params: { status: 'Running' },
      }),
      providesTags: ['TimeEntries'],
    }),
    getCurrentTime: builder.query({
      query: () => ({
        url: '/time-entries/get-time',
      }),
    }),
    getTimeEntries: builder.query({
      query: (weekStart) => ({
        url: '/time-entries',
        params: { weekStart },
      }),
      providesTags: ['TimeEntries'],
    }),
    getTimeEntryStats: builder.query({
      query: (weekStart) => ({
        url: '/time-entries/stats',
        params: { weekStart },
      }),
      providesTags: ['TimeEntryStats'],
    }),
    startTimer: builder.mutation({
      query: (newTimer) => ({
        url: '/time-entries/start',
        method: 'POST',
        body: newTimer,
      }),
      invalidatesTags: ['TimeEntries'],
    }),
    stopTimer: builder.mutation({
      query: (id) => ({
        url: `/time-entries/stop/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ['TimeEntries', 'TimeEntryStats'],
    }),
    getSingleUserTimeEntries: builder.query({
      query: () => "/time-entries/all",
      transformResponse: (response) => response.result, 
      providesTags: ["TimeEntries"], 
    }),
  }),
});

export const {
  useGetActiveTimerQuery,
  useGetTimeEntriesQuery,
  useGetTimeEntryStatsQuery,
  useStartTimerMutation,
  useStopTimerMutation,
  useGetCurrentTimeQuery,
  useGetSingleUserTimeEntriesQuery
} = timeEntryApi;