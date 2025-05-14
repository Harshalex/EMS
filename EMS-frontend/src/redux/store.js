import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { timeEntryApi } from "./api/timeEntryApiSlice.js";
import { projectApi } from "./api/projectApiSlice.js";
import { userApi } from "./api/userApiSlice.js";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import timerReducer from "./slices/timerSlice.js";

// Persist and encrypt the timer reducer
const timerPersistConfig = {
  key: "timer",
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_SECRET_KEY,
      onError: (err) => console.error("Encryption error:", err),
    }),
  ],
};

const persistedTimerReducer = persistReducer(timerPersistConfig, timerReducer);

export const store = configureStore({
  reducer: {
    timer: persistedTimerReducer,
    [timeEntryApi.reducerPath]: timeEntryApi.reducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Needed for redux-persist
    }).concat(
      timeEntryApi.middleware,
      projectApi.middleware,
      userApi.middleware
    ),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);