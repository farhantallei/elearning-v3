import { type NextRequest, NextResponse } from "next/server"

import constant from "./data/constant"
import cookie from "./data/cookie"

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  const isLoginPath = req.nextUrl.pathname === "/login"

  if (isLoginPath) {
    return handleLoginPath(req, res)
  }

  return handleProtectedPath(req, res)
}

async function handleLoginPath(req: NextRequest, res: NextResponse) {
  const { encryptedKey, tokenStorage, token } = getAuthCookies(req)

  const hasAllCookies = encryptedKey && tokenStorage && token
  if (!hasAllCookies) {
    return res
  }

  return NextResponse.redirect(new URL("/", req.url))
}

async function handleProtectedPath(req: NextRequest, res: NextResponse) {
  const {
    encryptedKey: cookieEncryptedKey,
    tokenStorage: cookieTokenStorage,
    token: cookieToken,
  } = getAuthCookies(req)

  const hasAllCookies = cookieEncryptedKey && cookieTokenStorage && cookieToken
  if (!hasAllCookies) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  res.headers.set("x-user-encrypted-key", cookieEncryptedKey)
  res.headers.set("x-user-token-storage", cookieTokenStorage)
  res.headers.set("x-user-token", cookieToken)

  return res
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!api|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}

function getAuthCookies(req: NextRequest) {
  const encryptedKey =
    req.cookies.get(cookie.ENCRYPTED_KEY(constant.PREFIX))?.value || null
  const tokenStorage =
    req.cookies.get(cookie.TOKEN_STORAGE(constant.PREFIX))?.value || null
  const token =
    req.cookies.get(cookie.AUTH_TOKEN(constant.PREFIX))?.value || null

  return { encryptedKey, tokenStorage, token }
}
