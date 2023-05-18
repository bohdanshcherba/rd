import { createAsyncThunk } from "@reduxjs/toolkit"
import { ActionType } from "./common"
import { AsyncThunkConfig } from "../store"
import { StorageKey } from "../../common/enums/enums"
import { TaskType } from "../../common/types"
import { profile } from "./reducer"
import { getDate } from "../../utils/date"

export const saveTasks = createAsyncThunk<any, Array<TaskType>, AsyncThunkConfig>(ActionType.SAVE_TASKS,
  async (value, { extra }) => {
    const { storage } = extra
    await storage.save(StorageKey.TASKS, value)
    return value
  })

export const loadTasks = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_TASKS,
  async (value, { extra }) => {
    const { storage } = extra
    let tasks = await storage.load(StorageKey.TASKS)
    if (!tasks) {
      tasks = []
      await storage.save(StorageKey.TASKS, [])
    }
    return tasks
  })


export const loadProgress = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_FILES,
  async (payload, { extra }) => {

    const { storage } = extra

    let files = await storage.load(StorageKey.PROGRESS)

    if (!files) {
      files = []
      await storage.save(StorageKey.PROGRESS, [])
    }

    return files
  })

export const updateTask = createAsyncThunk<any, TaskType, AsyncThunkConfig>(ActionType.UPDATE_TASK,
  async (task, { extra, getState, dispatch }) => {

    const { storage } = extra
    const tasks = getState().AppReducer.tasks
    const copy = [...tasks]
    try {

      const objIndex = copy.findIndex((obj => obj.id === task.id))
      copy[objIndex] = task

    } catch (e) {
      console.log(e)
    }
    await storage.save(StorageKey.TASKS, copy)
    dispatch(checkTask([]))
    return copy
  })

export const updateProfile = createAsyncThunk<any, profile, AsyncThunkConfig>(ActionType.UPDATE_PROFIlE,
  async (profile, { extra, getState }) => {

    const { storage } = extra

    await storage.save(StorageKey.PROFILE, profile)

    return profile
  })
export const updateProgress = createAsyncThunk<any, Array<any>, AsyncThunkConfig>(ActionType.UPDATE_PROGRESS,
  async (progress, { extra, getState }) => {

    const { storage } = extra

    await storage.save(StorageKey.PROGRESS, progress)

    return progress
  })

export const loadProfile = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.LOAD_PROFILE,
  async (payload, { extra }) => {

    const { storage } = extra

    return await storage.load(StorageKey.PROFILE) || null
  }
)

export const checkTask = createAsyncThunk<any, any, AsyncThunkConfig>(ActionType.CHECK_TASKS,
  async (payload, { extra, getState }) => {

    const { storage } = extra

    const profile = getState().AppReducer.profile
    let progress = [...getState().AppReducer.progress]
    let tasks = await storage.load(StorageKey.TASKS)

    const today = await storage.load(StorageKey.TODAY)


    if (today !== getDate()) {
      await storage.save(StorageKey.TODAY, getDate())

      const allDone = tasks.every(task => task.isDone)
      if (allDone) {
        if (profile) {
          profile.day += 1
          profile.todayDone = false
        }

        tasks = tasks.map(task => {
          task.isDone = false
          return task
        })
      }
    }


    try {
      const allDone = tasks.every(task => task.isDone)
      if (allDone) {
        const timeForUpdate = getDate()
        if (progress.indexOf(timeForUpdate) === -1) {
          if (profile){
            profile.todayDone = true
          }
          progress.push(timeForUpdate)
        }
      }

      if (new Date(getDate()).getTime() - new Date(progress[progress.length - 1]).getTime() > 86400000) {
        progress = []
        console.log("LOST")
      }

    } catch (e) {
      console.log(e)
    }

    await storage.save(StorageKey.TASKS, tasks)
    await storage.save(StorageKey.PROFILE, profile)
    await storage.save(StorageKey.PROGRESS, progress)

    return { profile, tasks, progress }
  }
)

