import React, { useState } from "react"
import { View, Text, TextInput, Button, StyleSheet } from "react-native"
import { validateOtp, generateOtp } from "../services/otpManager"
import { logEvent } from "../services/analytics"

const OtpScreen = ({ route, navigation }: any) => {
  const { email } = route.params

  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")

  const handleVerify = async () => {
    const result = validateOtp(email, otp)

    if (result.success) {
      await logEvent("OTP_SUCCESS")

      navigation.replace("Session")
    } else {
      await logEvent("OTP_FAILED")

      setError(result.reason)
    }
  }

  const handleResend = async () => {
    generateOtp(email)

    setOtp("")
    setError("")

    await logEvent("OTP_GENERATED")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter OTP</Text>

      <TextInput
        placeholder="6 digit OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Button title="Verify OTP" onPress={handleVerify} />

      <View style={{ marginTop: 10 }}>
        <Button title="Resend OTP" onPress={handleResend} />
      </View>
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
  },
  error: { color: "red", marginBottom: 10 }
})

export default OtpScreen