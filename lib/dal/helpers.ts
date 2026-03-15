import { APIError } from "@farhantallei/fetcher"
import { redirect } from "next/navigation"
import z, { ZodError } from "zod"

// import { getAuth } from "@/features/auth/lib/utils"
// import type { AuthUser } from "@/features/auth/types"

import {
  createErrorReturn,
  createSuccessReturn,
  type DalError,
  type DalReturn,
  ThrowableDalError,
} from "./types"

export function dalUnauthorizedRedirect<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  redirectPath = "/",
) {
  if (dalReturn.success) return dalReturn
  if (dalReturn.error.type === "no-access") return redirect(redirectPath)

  return dalReturn as DalReturn<T, Exclude<E, { type: "no-access" }>>
}

export function dalThrowError<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
) {
  if (dalReturn.success) return dalReturn

  throw dalReturn.error
}

export function dalVerifySuccess<T, E extends DalError>(
  dalReturn: DalReturn<T, E>,
  { unauthorizedRedirectPath }: { unauthorizedRedirectPath?: string } = {},
): T {
  const res = dalThrowError(
    dalUnauthorizedRedirect(dalReturn, unauthorizedRedirectPath),
  )
  return res.data
}

// export async function dalRequireAuth<T, E extends DalError>(
//   operation: (user: AuthUser) => Promise<DalReturn<T, E>>,
// ) {
//   const { data: user } = await getAuth()
//
//   if (user == null) {
//     return createErrorReturn({ type: "no-user" })
//   }
//
//   return operation(user)
// }

export async function dalOperation<T>(operation: () => Promise<T>) {
  try {
    const data = await operation()
    return createSuccessReturn(data)
  } catch (e) {
    if (e instanceof ThrowableDalError) {
      return createErrorReturn(e.dalError)
    }
    if (e instanceof APIError) {
      return createErrorReturn({
        type: "api-error",
        error: e.message,
      })
    }
    if (e instanceof ZodError) {
      return createErrorReturn({
        type: "validation-error",
        error: z.flattenError(e),
      })
    }
    return createErrorReturn({ type: "unknown-error", error: e })
  }
}
