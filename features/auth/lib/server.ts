import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import constant from "@/data/constant"
import cookie from "@/data/cookie"

export async function getAuth() {
  const heads = await headers()

  const encryptedKey = heads.get("x-user-encrypted-key")
  const tokenStorage = heads.get("x-user-token-storage")
  const token = heads.get("x-user-token")

  if (!encryptedKey || !tokenStorage || !token) {
    redirect("/login")
  }

  return { encryptedKey, tokenStorage, token }
}

export async function logoutFn() {
  const cookieStore = await cookies()

  cookieStore.delete(cookie.AUTH_TOKEN(constant.PREFIX))
  cookieStore.delete(cookie.ENCRYPTED_KEY(constant.PREFIX))
  cookieStore.delete(cookie.TOKEN_STORAGE(constant.PREFIX))
}
