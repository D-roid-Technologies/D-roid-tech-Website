// src/redux/Store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage
import { DimensionSlice } from "./slices/Dimension";
import { AppEntrySlice } from "./slices/AppEntrySlice";
import themeReducer from "./slices/ThemeSlice";
import { ContactSlice } from "./slices/ContactSlice";
import { TestimonialSlice } from "./slices/TestimonialSlice";
import { projectSlice } from "./slices/projectSlice";
import { userSlice } from "./slices/User"; // make sure the casing matches!
import { locationSlice } from './slices/Location';
import { allUsersSlice } from './slices/AllUserSlice';
import { signInAndOutSlice } from './slices/SignInAndOutSlice';
import { payslipSlice } from './slices/paySlipSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // only persist user slice
};

const rootReducer = combineReducers({
  dimension: DimensionSlice.reducer,
  user: userSlice.reducer,
  appEntry: AppEntrySlice.reducer,
  contact: ContactSlice.reducer,
  testimonial: TestimonialSlice.reducer,
  theme: themeReducer,
  projects: projectSlice.reducer,
  location: locationSlice.reducer,
  allUsers: allUsersSlice.reducer,
  SignInO: signInAndOutSlice.reducer,
  payslip: payslipSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist needs this
    }),
});

export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

