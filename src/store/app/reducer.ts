import { createReducer } from "@reduxjs/toolkit"
import { DataStatus } from "../../common/enums/enums"

import {
  loadProgress,
  updateTask,
  updateProfile,
  saveTasks,
  loadTasks,
  loadProfile,
  checkTask,
  updateProgress
} from "./action"
import { TaskType } from "../../common/types"

export type profile =  {
  challengeStarted: boolean | null,
  day: number,
  todayDone:boolean,
  totalDays: number,
  timeForUpdate: string,
  timeNotification?: string,
}

type State = {
  dataStatus: DataStatus,
  progress: Array<any>,
  tasks: Array<TaskType>
  profile: profile | null | undefined
};

const initialState: State = {
  dataStatus: DataStatus.IDLE,

  progress: [],
  tasks: [],
  profile: undefined
}

const reducer = createReducer(initialState, (builder) => {

  builder.addCase(loadProgress.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.progress = action.payload
  })
  builder.addCase(saveTasks.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.tasks = action.payload
  })
  builder.addCase(loadTasks.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.tasks = action.payload
  })
  builder.addCase(updateTask.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.tasks = action.payload
  })
  builder.addCase(updateProfile.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.profile = action.payload
  })
  builder.addCase(updateProgress.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.progress = action.payload
  })
  builder.addCase(loadProfile.pending, (state, action) => {
    state.dataStatus = DataStatus.PENDING
  })
  builder.addCase(loadProfile.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.profile = action.payload
  })
  builder.addCase(checkTask.fulfilled, (state, action) => {
    state.dataStatus = DataStatus.FULFILLED
    state.profile = action.payload.profile
    state.tasks = action.payload.tasks
    state.progress = action.payload.progress
  })
})

export { reducer }
