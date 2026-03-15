import { getAuth } from "@/features/auth/lib/server"
import AuthProvider from "@/features/auth/providers/auth-provider"

export default async function Layout({ children }: LayoutProps<"/">) {
  const auth = await getAuth()

  return <AuthProvider auth={auth}>{children}</AuthProvider>
}
