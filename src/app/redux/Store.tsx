import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { DimensionSlice } from "./slices/Dimension";
import { AppEntrySlice } from "./slices/AppEntrySlice";
import themeReducer from "./slices/ThemeSlice";
import { ContactSlice } from "./slices/ContactSlice";
import { TestimonialSlice } from "./slices/TestimonialSlice";
import { projectSlice } from "./slices/projectSlice";
import { userSlice } from "./slices/User";
import { locationSlice } from "./slices/Location";
import { allUsersSlice } from "./slices/AllUserSlice";
import { signInAndOutSlice } from "./slices/SignInAndOutSlice";
import { payslipSlice } from "./slices/paySlipSlice";
import { affiliatedAppsSlice } from "./slices/affiliatedAppsSlice";
import tasksReducer from "./slices/tasksSlice";
import { trainingSlice } from "./slices/TrainingsSlice";
import { scheduleTask } from "./slices/scheduleTask";
import ProgressionSlice from "./slices/ProgressionSlice";
import LeadFormSlice from "./slices/LeadFormSlice";
import { TSCSlice } from "./slices/TSCSlice";
import { userFormsSlice } from "./slices/userFormSlice";
import { notificationsSlice } from "./slices/notificationSlice";
import { onboardingSlice } from "./slices/onboarding";
import { memberStatsSlice } from "./slices/memberStatus";
import { membershipTierSlice } from "./slices/membershipTierSlice";
import staffReducer from "./slices/staffSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist user slice
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
  connectedApps: affiliatedAppsSlice.reducer,
  tasks: tasksReducer,
  trainings: trainingSlice.reducer,
  scheduleTask: scheduleTask.reducer,
  progression: ProgressionSlice,
  leadForm: LeadFormSlice,
  TSC: TSCSlice.reducer,
  form: userFormsSlice.reducer,
  notifications: notificationsSlice.reducer,
  onboarding: onboardingSlice.reducer,
  training: trainingSlice.reducer,
  memberStatus: memberStatsSlice.reducer,
  membershipTier: membershipTierSlice.reducer,
  staff: staffReducer
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
// Use rootReducer to infer the pre-persisted state shape for better selector types
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
