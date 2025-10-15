# Staff Dashboard Redux Integration

## Overview
This document describes the implementation of the Staff Dashboard Redux slice for managing staff metrics and performance data.

## Implementation Date
October 13, 2025

## What Was Implemented

### 1. Staff Slice (`staffSlice.ts`)
Created a new Redux slice to manage staff dashboard metrics.

**Location**: `src/app/redux/slices/staffSlice.ts`

#### State Structure
```typescript
{
  activeTasks: number;        // Number of active/ongoing tasks
  completedTasks: number;     // Number of completed tasks
  performanceScore: number;   // Staff performance score (0-5)
  attendanceRate: number;     // Attendance percentage (0-100)
  loading: boolean;           // Loading state for async operations
  error: string | null;       // Error message if any
}
```

#### Initial State
```typescript
{
  activeTasks: 0,
  completedTasks: 0,
  performanceScore: 0,
  attendanceRate: 0,
  loading: false,
  error: null
}
```

#### Actions

##### Synchronous Actions
- **`setActiveTasks(number)`** - Update the active tasks count
- **`setCompletedTasks(number)`** - Update the completed tasks count
- **`setPerformanceScore(number)`** - Update the performance score
- **`setAttendanceRate(number)`** - Update the attendance rate percentage
- **`setStaffMetrics(object)`** - Update multiple metrics at once
- **`resetStaffMetrics()`** - Reset all metrics to initial state

##### Asynchronous Actions (Thunks)
- **`fetchStaffMetrics(userId)`** - Fetch staff metrics from API
  - Currently returns mock data
  - Ready for API integration

### 2. Redux Store Integration

**File**: `src/app/redux/Store.tsx`

Added the staff reducer to the root reducer:
```typescript
import staffReducer from "./slices/staffSlice";

const rootReducer = combineReducers({
  // ... other reducers
  staff: staffReducer
});
```

### 3. Staff Dashboard Component Integration

**File**: `src/app/ui/pages/Dashboard/staff/StaffUserHomePage.tsx`

#### Changes Made:
1. Added `useDispatch` hook for dispatching actions
2. Added `useSelector` to access staff metrics from Redux state
3. Implemented automatic task count synchronization
4. Updated dashboard stats to use Redux state values
5. Added optional API fetch on component mount

#### Code Example:
```typescript
// Get staff metrics from Redux state
const { activeTasks, completedTasks, performanceScore, attendanceRate } = useSelector(
  (state: RootState) => state.staff
);

// Auto-sync task counts when tasks change
useEffect(() => {
  dispatch(setStaffMetrics({
    activeTasks: ongoingTasks,
    completedTasks: completedTasksCount,
  }));
}, [dispatch, ongoingTasks, completedTasksCount]);
```

## Usage Guide

### Accessing Staff Metrics in Components

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';

const MyComponent = () => {
  const staffMetrics = useSelector((state: RootState) => state.staff);
  
  return (
    <div>
      <p>Active Tasks: {staffMetrics.activeTasks}</p>
      <p>Completed Tasks: {staffMetrics.completedTasks}</p>
      <p>Performance: {staffMetrics.performanceScore}/5</p>
      <p>Attendance: {staffMetrics.attendanceRate}%</p>
    </div>
  );
};
```

### Updating Individual Metrics

```typescript
import { useDispatch } from 'react-redux';
import { setPerformanceScore, setAttendanceRate } from '../../../../redux/slices/staffSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const updateMetrics = () => {
    dispatch(setPerformanceScore(4.5));
    dispatch(setAttendanceRate(95));
  };
  
  return <button onClick={updateMetrics}>Update Metrics</button>;
};
```

### Updating Multiple Metrics at Once

```typescript
import { useDispatch } from 'react-redux';
import { setStaffMetrics } from '../../../../redux/slices/staffSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const updateAllMetrics = () => {
    dispatch(setStaffMetrics({
      activeTasks: 5,
      completedTasks: 12,
      performanceScore: 4.2,
      attendanceRate: 96
    }));
  };
  
  return <button onClick={updateAllMetrics}>Update All</button>;
};
```

### Fetching from API

To enable API fetching, uncomment the following in `StaffUserHomePage.tsx`:

```typescript
useEffect(() => {
  // Uncomment to fetch from API
  dispatch(fetchStaffMetrics(userDetails.uniqueId));
}, []);
```

Then update the API endpoint in `staffSlice.ts`:

```typescript
export const fetchStaffMetrics = createAsyncThunk(
  "staff/fetchMetrics",
  async (userId: string, { rejectWithValue }) => {
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`/api/staff/${userId}/metrics`);
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch staff metrics");
    }
  }
);
```

### Handling Loading and Error States

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';

const MyComponent = () => {
  const { activeTasks, loading, error } = useSelector(
    (state: RootState) => state.staff
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>Active Tasks: {activeTasks}</div>;
};
```

### Resetting Metrics

```typescript
import { useDispatch } from 'react-redux';
import { resetStaffMetrics } from '../../../../redux/slices/staffSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  
  const handleReset = () => {
    dispatch(resetStaffMetrics());
  };
  
  return <button onClick={handleReset}>Reset Metrics</button>;
};
```

## Current Behavior

### Automatic Task Synchronization
- **Active Tasks**: Automatically synced from tasks with status "ongoing"
- **Completed Tasks**: Automatically synced from tasks with status "completed"
- Updates occur whenever the tasks array changes

### Static Values (Ready for API Integration)
- **Performance Score**: Currently displays 0 (N/A) until updated
- **Attendance Rate**: Currently displays 0 (N/A) until updated

## API Integration Guide

### Expected API Response Format

```typescript
{
  activeTasks: number;
  completedTasks: number;
  performanceScore: number;  // Value between 0-5
  attendanceRate: number;    // Percentage value 0-100
}
```

### Steps to Integrate with Backend

1. **Update the API endpoint** in `staffSlice.ts`:
   ```typescript
   const response = await fetch(`${API_BASE_URL}/staff/${userId}/metrics`);
   ```

2. **Add authentication headers** if required:
   ```typescript
   const response = await fetch(`${API_BASE_URL}/staff/${userId}/metrics`, {
     headers: {
       'Authorization': `Bearer ${token}`,
       'Content-Type': 'application/json'
     }
   });
   ```

3. **Enable the fetch** in `StaffUserHomePage.tsx` by uncommenting line 216

4. **Handle API errors** appropriately in your component

## Files Modified

1. **Created**: `src/app/redux/slices/staffSlice.ts`
2. **Modified**: `src/app/redux/Store.tsx`
3. **Modified**: `src/app/ui/pages/Dashboard/staff/StaffUserHomePage.tsx`

## Benefits

✅ **Centralized State Management**: All staff metrics in one place  
✅ **Type Safety**: Full TypeScript support  
✅ **Reusability**: Metrics accessible from any component  
✅ **Scalability**: Easy to add more metrics  
✅ **API Ready**: Async thunk prepared for backend integration  
✅ **Auto-sync**: Task counts automatically updated  
✅ **Error Handling**: Built-in loading and error states  

## Future Enhancements

- [ ] Connect to actual backend API
- [ ] Add more metrics (e.g., project count, training progress)
- [ ] Implement real-time updates via WebSocket
- [ ] Add data caching and refresh intervals
- [ ] Create selectors for computed values
- [ ] Add unit tests for the slice
- [ ] Implement optimistic updates
- [ ] Add metric history/trends

## Testing

### Manual Testing Checklist
- [ ] Verify metrics display correctly on dashboard
- [ ] Test task count auto-synchronization
- [ ] Verify Redux DevTools shows correct state
- [ ] Test manual metric updates
- [ ] Test reset functionality
- [ ] Verify loading states
- [ ] Test error handling

### Redux DevTools
Monitor the staff slice in Redux DevTools:
```
state.staff = {
  activeTasks: 5,
  completedTasks: 12,
  performanceScore: 4.2,
  attendanceRate: 96,
  loading: false,
  error: null
}
```

## Support

For questions or issues related to the staff slice implementation, please contact the development team or refer to the Redux Toolkit documentation:
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [createSlice API](https://redux-toolkit.js.org/api/createSlice)
- [createAsyncThunk API](https://redux-toolkit.js.org/api/createAsyncThunk)

---

**Last Updated**: October 13, 2025  
**Version**: 1.0.0  
**Status**: ✅ Implemented and Ready for Use
