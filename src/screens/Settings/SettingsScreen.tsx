import * as React from "react"
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../../theme"
import { Header } from "../../components/Header"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { updateProfile, updateProgress } from "../../store/app/action"

const SettingsScreen = () => {

  const profile = useAppSelector(state => state.AppReducer.profile)
  const dispatch = useAppDispatch()

  const onPress = () => {
    dispatch(updateProfile(null))
    dispatch(updateProgress([]))
  }


  return (
    <View style={$container}>
      <Header/>
      <View style={{ alignItems: "center", bottom: 30, position: "absolute", width: "100%" }}>
        <TouchableOpacity style={$btn} activeOpacity={0.7} onPress={onPress}>
          <Text style={$textBtn}>Закінчити челендж</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const $container: ViewStyle = {
  flex:1,
  backgroundColor:colors.background
}

const $btn: ViewStyle = {
  width: 250,
  paddingBottom: 10,
  borderColor: colors.palette.primary200,
  borderWidth: 2,
  borderRadius: 10,
  paddingVertical: 7,
  alignItems: "center"

}

const $textBtn: TextStyle = {
  color: colors.text,
  fontSize: 22,
  fontFamily: "Oswald-Medium"


}

export { SettingsScreen }
