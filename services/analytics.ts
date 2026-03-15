import AsyncStorage from "@react-native-async-storage/async-storage"

const KEY = "APP_ANALYTICS_LOGS"

export const logEvent = async (event: string) => {
  try {
    const logs = await AsyncStorage.getItem(KEY)

    const parsed = logs ? JSON.parse(logs) : []

    parsed.push({
      event,
      timestamp: new Date().toISOString()
    })

    await AsyncStorage.setItem(KEY, JSON.stringify(parsed))
  } catch (error) {
    console.log("Analytics error", error)
  }
}