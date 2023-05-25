import * as React from "react"
import { ViewStyle } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "../components"
import { AddTaskModal, AddTaskScreen, CalendarScreen, HomeScreen } from "../screens"
import { colors } from "../theme"

const Tab = createBottomTabNavigator()

export function HomeNavigator() {

  const tabNavigationOption = ({ route }) => ({

    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: "",
    tabBarStyle: $tabBar,

    tabBarVisible: true,
    tabBarIcon: ({ focused }) => {
      let iconName

      if (route.name === "Home") {
        iconName = "list"
      }
      if (route.name === "AddTask") {
        iconName = "plus"
      }
      if (route.name === "Calendar") {
        iconName = "calendar"
      }
      return <Icon icon={iconName} color={focused ? colors.palette.primary200 : colors.palette.primary300} size={35} />
    }
  })


  return (
    <Tab.Navigator initialRouteName={"Home"}
                   screenOptions={tabNavigationOption}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddTask" component={AddTaskScreen}
                  options={
                    {
                      tabBarButton: () => <AddTaskModal/>
                    }} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
    </Tab.Navigator>
  )
}


const $tabBar: ViewStyle = {
  backgroundColor: colors.background,
  height: 60,

  borderColor: colors.palette.primary200,
  borderTopWidth: 0,
  elevation: 0,
  shadowOpacity: 0,
  borderWidth: 0

}
