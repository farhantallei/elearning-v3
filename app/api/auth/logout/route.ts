import { type NextRequest, NextResponse } from "next/server"

import { logoutFn } from "@/features/auth/lib/server"

export async function GET(request: NextRequest) {
  await logoutFn()

  return NextResponse.redirect(new URL("/login", request.url))
}
