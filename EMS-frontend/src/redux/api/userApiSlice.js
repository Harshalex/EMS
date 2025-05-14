import { createApi } from '@reduxjs/toolkit/query/react';
import { sharedBaseQuery } from './sharedBaseQuery';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: sharedBaseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Placeholder endpoint: GET /api/users/me (Fetch current user)
    getCurrentUser: builder.query({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    // Add more endpoints as needed (e.g., updateUserProfile)
  }),
});

export const { useGetCurrentUserQuery } = userApi;