import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function getAuth(): Promise<{ token: string }> {
  const heads = await headers()

  const token = heads.get("x-user-token")

  if (!token) {
    redirect("/login")
  }

  return { token }
}
