"use client"

import { createContext } from "react"

import type { ProfileModel } from "@/features/profile/types"

type AuthContextValue = {
  encryptedKey: string
  tokenStorage: string
  token: string
  profile: ProfileModel & { photo_profile?: string }
}

export const AuthContext = createContext({} as AuthContextValue)

type AuthProviderProps = {
  auth: { encryptedKey: string; tokenStorage: string; token: string }
  profile: ProfileModel & { photo_profile?: string }
} & React.PropsWithChildren

export default function AUthProvider({
  auth,
  profile,
  children,
}: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ ...auth, profile }}>
      {children}
    </AuthContext.Provider>
  )
}
