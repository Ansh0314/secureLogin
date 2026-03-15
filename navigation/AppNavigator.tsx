import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import LoginScreen from "../screens/LoginScreen"
import OtpScreen from "../screens/OtpScreen"
import SessionScreen from "../screens/Session"

const Stack = createNativeStackNavigator()

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />
      <Stack.Screen name="Session" component={SessionScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator