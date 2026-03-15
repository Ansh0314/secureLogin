import { useEffect, useRef, useState } from "react"

export const useSessionTimer = () => {
  const startTimeRef = useRef(Date.now())

  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(Date.now() - startTimeRef.current)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return duration
}