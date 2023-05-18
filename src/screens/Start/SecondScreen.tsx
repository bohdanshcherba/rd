import * as React from "react"
import { Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { colors } from "../../theme"
import { Icon } from "../../components"
import { useState } from "react"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useAppDispatch } from "../../store/store"
import { updateProfile } from "../../store/app/action"

const SecondScreen = ({ navigation }) => {

  const [days, setDays] = useState(21)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [time, setTime] = useState("04:00")

  const handleConfirm = (date) => {
    const minutes = date.getMinutes().toLocaleString() === "0" ? "00" : date.getMinutes().toLocaleString()
    setTime(date.getHours().toLocaleString() + ":" + minutes)
    setDatePickerVisibility(false)
  }

  const dispatch = useAppDispatch()

  const onStart = () => {
    dispatch(updateProfile({
      challengeStarted: true,
      timeForUpdate: time,
      totalDays: days,
      day: 1,
      todayDone: false,
    }))
  }

  return (
    <View style={$container}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="time"
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
        locale="en_GB"
      />
      <Text style={$subText}>
        Road to the Dream
      </Text>
      <Text style={[$subText, { marginBottom: 20, fontSize: 23, fontFamily: "Oswald-Regular" }]}>
        Налаштування
      </Text>
      <View style={$days}>
        <Text style={$daysText}>Кількість днів:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => days > 1 && setDays(days - 1)}>
            <Icon icon={"caret_back"} size={30} color={colors.text} />
          </TouchableOpacity>

          <TextInput style={$daysInput} value={days.toString()} onChangeText={e => setDays(Number(e))} />
          <TouchableOpacity activeOpacity={0.5} onPress={() => setDays(days + 1)}>

            <Icon icon={"caret_forward"} size={30} color={colors.text} />

          </TouchableOpacity>
        </View>
      </View>
      <View style={$days}>
        <Text style={$daysText}>Година оновлення:</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={{ color: colors.text, marginRight: 35, fontSize: 22, fontWeight: "bold" }}>
              {time}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: "center", bottom: 30, position: "absolute", width: "100%" }}>
        <TouchableOpacity style={$btn} activeOpacity={0.7} onPress={onStart}>
          <Text style={$textBtn}>Розпочати челендж</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background

}


const $subText: TextStyle = {
  fontFamily: "Oswald-Medium",
  fontSize: 25,
  textAlign: "center",
  marginTop: 10,

  color: colors.text
}
const $days: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginLeft: 15,
  marginBottom: 20
}

const $daysText: TextStyle = {
  fontFamily: "Oswald-Light",
  fontSize: 28,
  textAlign: "center",
  color: colors.text,
  marginBottom: 10,
  marginRight: 15
}

const $daysInput: TextStyle = {

  height: 45,
  maxWidth: 75,
  borderRadius: 10,
  paddingHorizontal: 15,
  textAlign: "center",
  paddingTop: 0,
  paddingBottom: 5,
  borderColor: colors.palette.primary300,
  borderWidth: 2,
  color: colors.text,
  fontSize: 22

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


export { SecondScreen }
