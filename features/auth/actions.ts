"use server"

import { cookies } from "next/headers"

import constant from "@/data/constant"
import cookie from "@/data/cookie"
import { env } from "@/data/env/server"
import { dalOperation } from "@/lib/dal/helpers"

import { logoutFn } from "./lib/server"
import { validateLoginInput } from "./validations"

export async function loginAction(formData: FormData) {
  return dalOperation(async () => {
    const data = Object.fromEntries(formData.entries())

    const { encrypted_key, token } = validateLoginInput(data)

    const cookieStore = await cookies()

    cookieStore.set(cookie.AUTH_TOKEN(constant.PREFIX), token, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 365 * 10,
    })

    cookieStore.set(cookie.ENCRYPTED_KEY(constant.PREFIX), encrypted_key, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 365 * 10,
    })
  })
}

export async function logoutAction() {
  await logoutFn()
}

export async function getAuthAction() {
  const cookieStore = await cookies()

  const encryptedKey =
    cookieStore.get(cookie.ENCRYPTED_KEY(constant.PREFIX))?.value || null
  const token =
    cookieStore.get(cookie.AUTH_TOKEN(constant.PREFIX))?.value || null

  return { encryptedKey, token }
}
