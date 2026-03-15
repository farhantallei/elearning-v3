import { headers } from "next/headers"
import { redirect } from "next/navigation"

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
