import * as React from "react"
import { ScrollView, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../../theme"
import { useAppSelector } from "../../store/store"
import { Header } from "../../components/Header"
import { Icon } from "../../components"

const CalendarScreen = ({navigation}) => {

  // @ts-ignore
  const totalDays = useAppSelector(state => state.AppReducer.profile.totalDays)
  const progress = useAppSelector(state => state.AppReducer.progress)
  const done = progress.length
  const days = Array.from({ length: totalDays }, (_, index) => index)
  return (
    <View style={$wrapper}>
      <View style={$header}>
        <Text style={$headerText}>
          Road to the Dream
        </Text>
        <TouchableOpacity onPress={()=>navigation.push("SettingsScreen")}>
          <Icon icon={"settings_field"} size={25} color={colors.text}/>

        </TouchableOpacity>
      </View>
      <Text style={$subText}>
        {done} / {totalDays}
      </Text>
      <ScrollView contentContainerStyle={$container}>

        {days.map((i) =>
          <View key={i} style={$checkBox}>
            {!(i < done) && <Text style={[$checkBoxText,(i+1 === totalDays)&&{color:colors.palette.angry500}]}>{i+1}</Text>}
            {i < done && < Icon icon={"check2"} size={45} color={colors.text} />}
          </View>)}
      </ScrollView>
    </View>
  )
}

const $wrapper: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background

}
const $header: ViewStyle = {
  backgroundColor: colors.background,
  paddingHorizontal: 30,
  flexDirection: "row",
  alignItems:'center',
  height: 60,

  justifyContent: "space-between"
}
const $headerText: TextStyle = {

  fontFamily: "Oswald-Medium",
  fontSize: 25,
  textAlign: "center",
  paddingBottom:5,
  color: colors.text
}
const $subText: TextStyle = {
  fontFamily: "Oswald-Medium",
  fontSize: 30,
  textAlign: "center",
  marginTop: 10,
  marginBottom: 5,
  color: colors.text
}

const $checkBoxText: TextStyle = {
  fontFamily: "Oswald-Medium",
  fontSize: 30,
  textAlign: "center",
  marginTop: 0,
  marginBottom: 5,
  color: colors.palette.primary300,


}

const $container: ViewStyle = {

  backgroundColor: colors.background,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center"
}
const $checkBox: ViewStyle = {
  width: 60,
  height: 60,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: colors.text,
  borderRadius: 12,
  marginHorizontal: 10,
  marginVertical: 10
}

export { CalendarScreen }
