"use client"

import { Logout05Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { ChevronsUpDown } from "lucide-react"
import { useRouter } from "next/navigation"
import { use, useTransition } from "react"

import SpinnerWrapper from "@/components/common/spinner-wrapper"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuSeparator,
  MenuTrigger,
} from "@/components/ui/menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { logoutAction } from "@/features/auth/actions"
import { AuthContext } from "@/features/auth/providers/auth-provider"
import { base64ToDataUrl, getInitials } from "@/lib/utils"

export default function FooterMenu() {
  const router = useRouter()
  const [isLogoutPending, startLogoutTransition] = useTransition()

  const { profile } = use(AuthContext)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Menu>
          <MenuTrigger
            render={
              <SidebarMenuButton
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                size="lg"
              />
            }
          >
            <Avatar className="size-8 rounded-lg">
              {profile.photo_profile ? (
                <>
                  <AvatarImage
                    alt={profile.full_name || "Profile"}
                    src={base64ToDataUrl(profile.photo_profile)}
                  />
                  <AvatarFallback className="rounded-lg">
                    {getInitials(profile.full_name || "?")}
                  </AvatarFallback>
                </>
              ) : (
                <AvatarFallback className="rounded-lg">
                  {getInitials(profile.full_name || "?")}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {profile.full_name || "???"}
              </span>
              <span className="truncate text-xs">
                {profile.email || "???@mail.com"}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto size-4" />
          </MenuTrigger>

          <MenuPopup align="end" side="right" sideOffset={4}>
            <MenuGroup className="min-w-56">
              <MenuGroupLabel className="p-0">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    {profile.photo_profile ? (
                      <>
                        <AvatarImage
                          alt={profile.full_name || "Profile"}
                          src={base64ToDataUrl(profile.photo_profile)}
                        />
                        <AvatarFallback className="rounded-lg">
                          {getInitials(profile.full_name || "?")}
                        </AvatarFallback>
                      </>
                    ) : (
                      <AvatarFallback className="rounded-lg">
                        {getInitials(profile.full_name || "?")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {profile.full_name || "???"}
                    </span>
                    <span className="truncate text-xs">
                      {profile.email || "???@mail.com"}
                    </span>
                  </div>
                </div>
              </MenuGroupLabel>
            </MenuGroup>
            <MenuSeparator />
            <MenuItem
              disabled={isLogoutPending}
              onClick={(e) => {
                e.preventBaseUIHandler()

                startLogoutTransition(async () => {
                  await logoutAction()
                  router.push("/login")
                })
              }}
            >
              <SpinnerWrapper loading={isLogoutPending}>
                <HugeiconsIcon icon={Logout05Icon} strokeWidth={2} />
              </SpinnerWrapper>
              Keluar
            </MenuItem>
          </MenuPopup>
        </Menu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
