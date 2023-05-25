import React from "react"

import {
  SafeAreaView,
  StatusBar

} from "react-native"
import { Provider } from "react-redux"
import store from "./store/store"
import { AppNavigator } from "./navigators"
import { colors } from "./theme"

const App = () => {

  return (
    <Provider store={store}>

      <StatusBar backgroundColor={colors.background}  />

      <AppNavigator/>

    </Provider>

  )
}



export default App
