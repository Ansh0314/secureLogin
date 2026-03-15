import React from "react"
import { View, Text, Button, StyleSheet } from "react-native"
import { useSessionTimer } from "../hooks/useSessionTimer"
import { logEvent } from "../services/analytics"

const Session = ({ navigation }: any) => {
  const duration = useSessionTimer()
  
  const startTime = new Date().toLocaleTimeString()
  const minutes = Math.floor(duration / 60000)
  const seconds = Math.floor((duration % 60000) / 1000)

  const handleLogout = async () => {
    await logEvent("LOGOUT")

    navigation.replace("Login")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session Active</Text>
      <Text>Session started at: {startTime}</Text>

      <Text style={styles.timer}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>

      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  timer: { fontSize: 30, marginBottom: 20 }
})

export default Session