import {
  composeInterceptors,
  createFetcher,
  createInterceptor,
} from "@farhantallei/fetcher"
import { buildCookieHeader, buildCurl } from "@farhantallei/fetcher/helper"
import { RedirectType, redirect } from "next/navigation"

import { env } from "@/data/env/client"
import { getAuthAction } from "@/features/auth/actions"

// ===== OASIS =====
const oasisAuthInterceptor = createInterceptor(async () => {
  // const token = await getAuthToken()
  // const role = await getRoleId()
  //
  // return {
  //   headers: {
  //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
  //     ...(role ? { role } : {}),
  //   },
  // }
  return {}
})

const oasisCurlInterceptor = createInterceptor(async (options, url) => {
  const curl = buildCurl({ url, options })
  const endpoint = url.slice(env.NEXT_PUBLIC_OASIS_API_URL.length)

  console.groupCollapsed("CURL: ", endpoint)
  console.log(curl)
  console.groupEnd()

  return options
})

const oasisComposedInterceptor = composeInterceptors(
  oasisAuthInterceptor,
  ...(env.NEXT_PUBLIC_NODE_ENV === "development" ? [oasisCurlInterceptor] : []),
)

export const oasisFetcher = createFetcher(env.NEXT_PUBLIC_OASIS_API_URL, {
  interceptor: oasisComposedInterceptor,
})

// ===== ELEARNING =====
const elearningAuthInterceptor = createInterceptor(async () => {
  const { encryptedKey, token } = await getAuthAction()

  const cookieHeader = buildCookieHeader({
    2492117: encryptedKey ? `"${encryptedKey}"` : null,
    // 9121522: `"Mahasiswa"`,
    // 11011001: `"${full_name}"`,
    712162213: token ? `"${token}"` : null,
  })

  return {
    headers: {
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
    },
  }
})

const elearningCurlInterceptor = createInterceptor(async (options, url) => {
  const curl = buildCurl({ url, options })
  const endpoint = url.slice(env.NEXT_PUBLIC_ELEARNING_API_URL.length)

  console.groupCollapsed("CURL: ", endpoint)
  console.log(curl)
  console.groupEnd()

  return options
})

const elearningComposedInterceptor = composeInterceptors(
  elearningAuthInterceptor,
  ...(env.NEXT_PUBLIC_NODE_ENV === "development"
    ? [elearningCurlInterceptor]
    : []),
)

export const elearningFetcher = createFetcher(
  env.NEXT_PUBLIC_ELEARNING_API_URL,
  {
    interceptor: elearningComposedInterceptor,
    onError: (error) => {
      if (error.type === "api") {
        if (error.error.isUnauthorized()) {
          redirect("/api/auth/logout", RedirectType.replace)
        }
      }
    },
  },
)
