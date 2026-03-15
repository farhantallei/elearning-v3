import { SidebarProvider } from "@/components/ui/sidebar"
import { getAuth } from "@/features/auth/lib/server"
import AuthProvider from "@/features/auth/providers/auth-provider"
import { getProfile, getProfileDp } from "@/features/profile/api"

export default async function Layout({ children }: LayoutProps<"/">) {
  const auth = await getAuth()

  const [profile, profileDp] = await Promise.all([
    getProfile({ encryptedKey: auth.encryptedKey }),
    getProfileDp({
      encryptedKey: auth.encryptedKey,
      tokenStorage: auth.tokenStorage,
    }),
  ])

  return (
    <AuthProvider
      auth={auth}
      profile={{ ...profile, photo_profile: profileDp?.file_content_base64 }}
    >
      <SidebarProvider>{children}</SidebarProvider>
    </AuthProvider>
  )
}
