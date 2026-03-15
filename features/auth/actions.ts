"use server"

import { cookies } from "next/headers"

import constant from "@/data/constant"
import cookie from "@/data/cookie"
import { env } from "@/data/env/server"
import { dalOperation } from "@/lib/dal/helpers"

import { validateLoginInput } from "./validations"

export async function loginAction(formData: FormData) {
  return dalOperation(async () => {
    const data = Object.fromEntries(formData.entries())

    const { encrypted_key, token_storage, token } = validateLoginInput(data)

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

    cookieStore.set(cookie.TOKEN_STORAGE(constant.PREFIX), token_storage, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 365 * 10,
    })
  })
}

export async function logoutAction() {
  const cookieStore = await cookies()

  cookieStore.delete(cookie.AUTH_TOKEN(constant.PREFIX))
  cookieStore.delete(cookie.ENCRYPTED_KEY(constant.PREFIX))
  cookieStore.delete(cookie.TOKEN_STORAGE(constant.PREFIX))
}
