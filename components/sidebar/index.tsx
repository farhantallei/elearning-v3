"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar"

import FooterMenu from "./menu/footer-menu"
import HeaderMenu from "./menu/header-menu"
import MainMenu from "./menu/main-menu"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <HeaderMenu />
      </SidebarHeader>

      <SidebarContent>
        <MainMenu />
      </SidebarContent>

      <SidebarFooter>
        <FooterMenu />
      </SidebarFooter>
    </Sidebar>
  )
}
