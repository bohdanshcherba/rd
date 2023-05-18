import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as React from "react"
import { useEffect } from "react"
import { BackHandler, useColorScheme, View } from "react-native"
import { HomeNavigator } from "./HomeNavigator"
import { SecondScreen, SettingsScreen, StartScreen } from "../screens"
import { useAppDispatch, useAppSelector } from "../store/store"
import { loadProfile, loadProgress } from "../store/app/action"
import { colors } from "../theme"

const Stack = createNativeStackNavigator()

const handleBackButton = () => {
  BackHandler.exitApp()
  return true
}

const AppStack = () => {


  const dispatch = useAppDispatch()

  const { profile } = useAppSelector(state => state.AppReducer)

  useEffect(()=>{

    dispatch(loadProgress([]))
    dispatch(loadProfile([]))
  },[])



  if (profile === undefined){
    return <View style={{backgroundColor: colors.background, flex:1}}>

    </View>
  }

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
                          listeners={{
                            focus: () => BackHandler.addEventListener("hardwareBackPress", handleBackButton)
                            , blur: () => BackHandler.removeEventListener("hardwareBackPress", handleBackButton)
                          }}
            />
          <Stack.Screen name={"SettingsScreen"} component={SettingsScreen}/>
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
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AppStack />
    </NavigationContainer>
  )
}
