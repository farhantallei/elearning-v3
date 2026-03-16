import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import constant from "@/data/constant"
import cookie from "@/data/cookie"
import { env } from "@/data/env/server"

export async function getAuth() {
  const heads = await headers()

  const encryptedKey = heads.get("x-user-encrypted-key")
  const token = heads.get("x-user-token")

  if (!encryptedKey || !token) {
    redirect("/login")
  }

  return { encryptedKey, tokenStorage: env.TOKEN_STORAGE, token }
}

export async function logoutFn() {
  const cookieStore = await cookies()

  cookieStore.delete(cookie.AUTH_TOKEN(constant.PREFIX))
  cookieStore.delete(cookie.ENCRYPTED_KEY(constant.PREFIX))
}
