// @ts-ignore
import React, { FC, useState } from "react"
import { ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native"
import { Icon } from "./Icon"
import { colors } from "../theme"


interface Props {
  day?: number | string
  dayDone?: boolean
}

export const Header: FC<Props> = ({ day, dayDone }) => {


  return <View style={$header}>
    <Text style={$subText}>
      Road to the Dream
    </Text>
    <View style={{flexDirection:"row"}}>
      {day ? <Text style={$subText}>День: {day}</Text>:null}
      {dayDone &&
        <View style={$check}>
          <Icon icon={"check2"} size={23} color={colors.text} />
        </View>
      }
    </View>


  </View>
}

const $header: ViewStyle = {
  backgroundColor: colors.background,
  paddingHorizontal: 30,
  flexDirection: "row",
  height: 60,

  justifyContent: "space-between"
}
const $check: ViewStyle = {
  position:'absolute'
}
const $subText: TextStyle = {
  fontFamily: "Oswald-Medium",
  fontSize: 25,
  textAlign: "center",
  marginTop: 10,

  color: colors.text
}
