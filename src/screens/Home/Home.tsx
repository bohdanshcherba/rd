import * as React from "react"
import { Text, View, ViewStyle } from "react-native"
import { colors } from "../../theme"
import { Task } from "./components/Task"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { checkTask, loadTasks } from "../../store/app/action"

export const HomeScreen = ({ navigation }) => {
  const dispatch = useAppDispatch()
  const { tasks, profile } = useAppSelector(state => state.AppReducer)

  useEffect(() => {
    dispatch(loadTasks([]))
    dispatch(checkTask([]))
  }, [])


  return (
    <View style={$container}>
      <Header day={profile?.day} dayDone={profile?.todayDone}/>
      {tasks.map(task => <Task key={task.id} task={task} />)}

    </View>
  )
}
const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  width: "100%",
  backgroundColor: colors.background
}

