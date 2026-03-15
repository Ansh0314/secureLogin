import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { generateOtp } from "../services/otpManager"
import { logEvent } from "../services/analytics"

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("")

  const handleSendOtp = async () => {
    const otp = generateOtp(email)

    await logEvent("OTP_GENERATED")

    console.log("Generated OTP:", otp)

    navigation.navigate("Otp", { email })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Email Login</Text>

      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <Button title="Send OTP" onPress={handleSendOtp} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 22, marginBottom: 20 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5
  }
})

export default LoginScreen