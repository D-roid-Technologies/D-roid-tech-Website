import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the staff dashboard state interface
export interface StaffDashboardState {
  activeTasks: number;
  completedTasks: number;
  performanceScore: number;
  attendanceRate: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: StaffDashboardState = {
  activeTasks: 0,
  completedTasks: 0,
  performanceScore: 0,
  attendanceRate: 0,
  loading: false,
  error: null,
};

// Async thunk to fetch staff dashboard metrics
// This can be connected to your API endpoint
export const fetchStaffMetrics = createAsyncThunk(
  "staff/fetchMetrics",
  async (userId: string, { rejectWithValue }) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/staff/${userId}/metrics`);
      // const data = await response.json();
      // return data;

      // Mock data for now - replace with actual API call
      return {
        activeTasks: 5,
        completedTasks: 12,
        performanceScore: 4.2,
        attendanceRate: 96,
      };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch staff metrics");
    }
  }
);

// Create the staff slice
export const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    // Action to update active tasks count
    setActiveTasks: (state, action: PayloadAction<number>) => {
      state.activeTasks = action.payload;
    },
    // Action to update completed tasks count
    setCompletedTasks: (state, action: PayloadAction<number>) => {
      state.completedTasks = action.payload;
    },
    // Action to update performance score
    setPerformanceScore: (state, action: PayloadAction<number>) => {
      state.performanceScore = action.payload;
    },
    // Action to update attendance rate
    setAttendanceRate: (state, action: PayloadAction<number>) => {
      state.attendanceRate = action.payload;
    },
    // Action to update all metrics at once
    setStaffMetrics: (
      state,
      action: PayloadAction<{
        activeTasks?: number;
        completedTasks?: number;
        performanceScore?: number;
        attendanceRate?: number;
      }>
    ) => {
      if (action.payload.activeTasks !== undefined) {
        state.activeTasks = action.payload.activeTasks;
      }
      if (action.payload.completedTasks !== undefined) {
        state.completedTasks = action.payload.completedTasks;
      }
      if (action.payload.performanceScore !== undefined) {
        state.performanceScore = action.payload.performanceScore;
      }
      if (action.payload.attendanceRate !== undefined) {
        state.attendanceRate = action.payload.attendanceRate;
      }
    },
    // Action to reset metrics
    resetStaffMetrics: (state) => {
      state.activeTasks = 0;
      state.completedTasks = 0;
      state.performanceScore = 0;
      state.attendanceRate = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchStaffMetrics pending
      .addCase(fetchStaffMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle fetchStaffMetrics fulfilled
      .addCase(fetchStaffMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.activeTasks = action.payload.activeTasks;
        state.completedTasks = action.payload.completedTasks;
        state.performanceScore = action.payload.performanceScore;
        state.attendanceRate = action.payload.attendanceRate;
      })
      // Handle fetchStaffMetrics rejected
      .addCase(fetchStaffMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setActiveTasks,
  setCompletedTasks,
  setPerformanceScore,
  setAttendanceRate,
  setStaffMetrics,
  resetStaffMetrics,
} = staffSlice.actions;

// Export reducer
export default staffSlice.reducer;
