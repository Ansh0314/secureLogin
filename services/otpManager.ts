import { OTPRecord } from "../types/auth"

const otpStore: Map<string, OTPRecord> = new Map()

export const generateOtp = (email: string): string => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  const record: OTPRecord = {
    otp,
    expiresAt: Date.now() + 60000,
    attempts: 0
  }

  otpStore.set(email, record)

  return otp
}

export const validateOtp = (email: string, inputOtp: string) => {
  const record = otpStore.get(email)

  if (!record) {
    return { success: false, reason: "OTP not found" }
  }

  if (Date.now() > record.expiresAt) {
    return { success: false, reason: "OTP expired" }
  }

  if (record.attempts >= 3) {
    return { success: false, reason: "Maximum attempts exceeded" }
  }

  if (record.otp !== inputOtp) {
    record.attempts += 1
    return { success: false, reason: "Incorrect OTP" }
  }

  otpStore.delete(email)

  return { success: true }
}