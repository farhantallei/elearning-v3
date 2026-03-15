import { Home03Icon, Mortarboard01Icon } from "@hugeicons/core-free-icons"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"

import SidebarItem from "../core/sidebar-item"

export default function MainMenu() {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu Utama</SidebarGroupLabel>
      <SidebarGroupContent
      // className="flex flex-col gap-2"
      >
        <SidebarMenu>
          <SidebarItem
            href="/"
            icon={Home03Icon}
            isActive={pathname === "/"}
            label="Beranda"
          />
        </SidebarMenu>

        <SidebarMenu>
          <SidebarItem
            href="/subject"
            icon={Mortarboard01Icon}
            isActive={pathname === "/subject"}
            label="Mata Kuliah"
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
