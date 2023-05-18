import * as React from "react"
import {
  ImageStyle, Keyboard,
  KeyboardAvoidingView, KeyboardAvoidingViewBase, Platform,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native"
import { Icon } from "../../components"
import { useEffect, useState } from "react"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import { TaskType } from "../../common/types"
import { colors } from "../../theme"

import { saveTasks } from "../../store/app/action"
import { useAppDispatch } from "../../store/store"


const StartScreen = ({ navigation }) => {

  const dispatch = useAppDispatch()

  const [tasks, setTasks] = useState<Array<TaskType>>([])
  const [value, setValue] = useState("")
  const [lastId, setLastId] = useState("")
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true)
    })

    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false)
    })

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])


  const addTask = () => {
    lastId ? onSubmitEditing() : ""
    const id = uuidv4()
    setTasks([...tasks, { id, isDone: false, name: "", isEdit: true, createdAt: new Date }])
    setLastId(id)
  }

  const onSubmitEditing = () => {

    const objIndex = tasks.findIndex((obj => obj.id === lastId))
    tasks[objIndex].isEdit = false
    tasks[objIndex].name = value
    setValue("")
    setTasks(tasks)
    setLastId("")
  }
  const onRemove = (id) => {

    const objIndex = tasks.findIndex((obj => obj.id === id))
    const t = [...tasks]
    t.splice(objIndex, 1)
    setTasks(t)
  }

  const onNext = () => {
    dispatch(saveTasks(tasks))
    navigation.push("SecondScreen")
  }

  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={$container}>
        <View style={$logoContainer}>
          <Text style={$logo}>Road to the Dream</Text>
        </View>
        <Icon icon={"irregular"} color={colors.palette.primary200} size={50} />
        <Text style={$subText}>Додай завдання</Text>
        <View style={$tasks}>
          {tasks.map((task, index) => {
            return (
              <View key={task.id} style={$taskContainer}>
                <Text style={$taskNumber}>{index + 1 + "."}</Text>
                <View style={$taskInput}>
                  {!task.isEdit ?
                    <TouchableOpacity style={$cross} activeOpacity={0.6} onPress={() => onRemove(task.id)}>
                      <Icon icon={"cross_field"} size={15} color={"white"} />
                    </TouchableOpacity> :
                    <TouchableOpacity style={$check} activeOpacity={0.6} onPress={onSubmitEditing}>
                      <Icon icon={"check_field"} size={25} />
                    </TouchableOpacity>
                  }
                  <TextInput style={$task}
                             autoFocus={true}
                             editable={task.isEdit}
                             value={task.isEdit ? value : task.name}
                             onChangeText={e => setValue(e)}
                             onSubmitEditing={onSubmitEditing}
                  />
                </View>
              </View>
            )
          })}

          <TouchableOpacity onPress={addTask} style={$taskContainer}>
            <Text style={$taskNumber}>{tasks.length + 1 + "."}</Text>
            <View style={$btn}>
              <Icon icon={"plus"} size={33} color={colors.text} />
            </View>
          </TouchableOpacity>
        </View>
        {!keyboardVisible && (
          <TouchableOpacity style={$nextBtn} onPress={onNext}>

            <Text style={$nextBtnText}>{tasks.length >= 3 ? "Далі" : `${tasks.length}/3`}</Text>
          </TouchableOpacity>
        )}

      </View>

    </KeyboardAvoidingView>
  )
}


const $container: ViewStyle = {
  flex: 1,
  height: "100%",
  backgroundColor: "#212121",
  alignItems: "center"
}

const $logoContainer: ViewStyle = {
  marginTop: 50,
  width: "80%"
}

const $logo: TextStyle = {
  fontFamily: "BebasNeue-Regular",
  fontSize: 65,
  textAlign: "center",
  color: colors.text,
  marginBottom: 10
}
const $subText: TextStyle = {
  fontFamily: "Oswald-Medium",
  fontSize: 25,
  textAlign: "center",
  marginTop: 10,
  color: colors.text
}

const $tasks: ViewStyle = {
  width: "100%",
  alignItems: "center"

}


const $taskContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: 200,
  marginVertical: 5

}

const $taskInput: ViewStyle = {
  width: "100%",

  marginHorizontal: 20
}


const $taskNumber: TextStyle = {
  color: colors.text,
  fontSize: 22,
  fontWeight: "300",

}

const $task: TextStyle = {

  zIndex: -1,
  borderRadius: 10,
  paddingHorizontal: 15,
  paddingTop: 0,
  paddingBottom: 5,
  borderColor: colors.palette.primary300,
  borderWidth: 2,
  color: colors.text,
  fontSize: 22,
  fontFamily: "Oswald-Light"
}

const $cross: ViewStyle = {
  backgroundColor: "red",
  borderRadius: 50,
  padding: 5,
  position: "absolute",
  right: -10,
  top: -10,
  zIndex: 100
}
const $check: ViewStyle = {


  position: "absolute",
  right: -10,
  top: -10,
  zIndex: 100
}

const $btn: ViewStyle = {

  width: "100%",
  borderColor: colors.palette.primary300,
  borderWidth: 2,
  borderRadius: 10,
  alignItems: "center",
  paddingVertical: 2,
  marginHorizontal: 20
}
const $nextBtn: ViewStyle = {
  width: 150,
  position: "absolute",
  bottom: 40,
  right: 20,
  borderColor: colors.palette.primary200,
  borderWidth: 2,
  borderRadius: 10,
  paddingVertical: 7,
  alignItems: "center"
}
const $nextBtnText: TextStyle = {
  color: colors.text,
  fontSize: 22,
  fontFamily: "Oswald-Medium"
}


export { StartScreen }
