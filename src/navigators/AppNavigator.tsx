import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { useEffect } from "react"

import { HomeNavigator } from "./HomeNavigator"
import { SecondScreen, SettingsScreen, StartScreen } from "../screens"
import { useAppDispatch, useAppSelector } from "../store/store"
import { loadProfile, loadProgress } from "../store/app/action"

import RNBootSplash from "react-native-bootsplash"

const Stack = createNativeStackNavigator()


const AppStack = () => {


  const dispatch = useAppDispatch()

  const { profile } = useAppSelector(state => state.AppReducer)

  useEffect(() => {
    dispatch(loadProgress([]))
    dispatch(loadProfile([]))
  }, [])


  return (
    <Stack.Navigator
      screenOptions={() => {
        return {
          headerShown: false
        }
      }}
      initialRouteName={"HomeNavigation"}
    >
      {
        profile ? <Stack.Group>
            <Stack.Screen name="HomeNavigation" component={HomeNavigator}

            />
            <Stack.Screen name={"SettingsScreen"} component={SettingsScreen} />
          </Stack.Group>
          :
          <Stack.Group>
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="SecondScreen" component={SecondScreen} />
          </Stack.Group>
      }
    </Stack.Navigator>
  )
}


export const AppNavigator = () => {


  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({ fade: true, duration: 200 })}>
      <AppStack />
    </NavigationContainer>
  )
}
