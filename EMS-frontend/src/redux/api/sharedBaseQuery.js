import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const sharedBaseQuery = fetchBaseQuery({
  baseUrl: 'http://192.168.1.43:5000', 
  prepareHeaders: (headers, { getState }) => {
    // Add authentication token if needed
    const token = localStorage.getItem('token'); 
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});