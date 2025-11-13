import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface FreeTierState {
  toolUsage: {
    [toolId: string]: {
      usageCount: number
      limit: number
      isLocked: boolean
    }
  }
}

const initialState: FreeTierState = {
  toolUsage: {},
}

const freeTierSlice = createSlice({
  name: "freeTier",
  initialState,
  reducers: {
    incrementToolUsage(state, action: PayloadAction<string>) {
      const toolId = action.payload

      if (!state.toolUsage[toolId]) {
        state.toolUsage[toolId] = {
          usageCount: 0,
          limit: 2,
          isLocked: false,
        }
      }

      const tool = state.toolUsage[toolId]

      if (tool.isLocked) return

      tool.usageCount += 1

      if (tool.usageCount >= tool.limit) {
        tool.isLocked = true
      }
    },

    resetToolUsage(state, action: PayloadAction<string>) {
      const toolId = action.payload

      if (state.toolUsage[toolId]) {
        state.toolUsage[toolId] = {
          usageCount: 0,
          limit: 2,
          isLocked: false,
        }
      }
    },

    resetAllTools(state) {
      state.toolUsage = {}
    },
  },
})

export const {
  incrementToolUsage,
  resetToolUsage,
  resetAllTools,
} = freeTierSlice.actions

export default freeTierSlice.reducer
