import React from "react"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import CheckBox from "@react-native-community/checkbox"
import { TaskType } from "../../../common/types"

import { checkTask, updateTask } from "../../../store/app/action"
import { useAppDispatch } from "../../../store/store"
import { colors } from "../../../theme"
import { Icon } from "../../../components"

export type Props = {
  task: TaskType
}

const Task: React.FC<Props> = ({ task }) => {

  const dispatch = useAppDispatch()

  const onPress = () => {
    dispatch(updateTask({ ...task, isDone: !task.isDone }))
  }

  return (
    <TouchableOpacity style={$task} onPress={onPress} activeOpacity={0.5}>
      <View style={$checkBox}>
        {
          task.isDone ? <Icon icon={"check2"} size={20} color={colors.text} /> : null
        }
      </View>
      <View>
        <Text style={$taskName}>{task.name}</Text>
        {
         task.isDone && <View style={$line}></View>
        }
        </View>


    </TouchableOpacity>
  )
}

const $checkBox: ViewStyle = {
  width: 22,
  height: 22,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: colors.text,
  borderRadius: 5,
  marginHorizontal: 10
}

const $task: ViewStyle = {
  backgroundColor: colors.transparent,
  flexDirection: "row",
  alignItems: "center",

  margin: 10,
  borderColor: colors.text,
  borderWidth: 2,
  paddingHorizontal: 5,
  paddingTop: 7,
  paddingBottom: 10,
  borderRadius: 15
}

const $taskName: TextStyle = {
  color: colors.text,
  fontFamily: "Oswald-Regular",
  fontSize: 18,
  textAlign: "center"
}
const $line: TextStyle = {
  position: "absolute",
  bottom: 10,
  left: 0,
  right: 0,
  paddingHorizontal:5,
  borderBottomWidth: 2, // Adjust this value to change the line size
  borderBottomColor: colors.text // Adjust this value to change the line color
}

export { Task }
