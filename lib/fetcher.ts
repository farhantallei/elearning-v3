import {
  composeInterceptors,
  createFetcher,
  createInterceptor,
} from "@farhantallei/fetcher"

import { env } from "@/data/env/client"

const authInterceptor = createInterceptor(async () => {
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

const composedInterceptor = composeInterceptors(authInterceptor)

export const oasisFetcher = createFetcher(
  env.NEXT_PUBLIC_OASIS_API_URL,
  composedInterceptor,
)
