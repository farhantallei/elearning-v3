"use client"

import { createContext } from "react"

type AuthContextValue = { token: string }

export const AuthContext = createContext({} as AuthContextValue)

type AuthProviderProps = { auth: { token: string } } & React.PropsWithChildren

export default function AUthProvider({ auth, children }: AuthProviderProps) {
  return (
    <AuthContext.Provider value={{ ...auth }}>{children}</AuthContext.Provider>
  )
}
