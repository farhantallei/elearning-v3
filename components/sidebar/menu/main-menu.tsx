import {
  Home03Icon,
  Mortarboard01Icon,
  Task01Icon,
} from "@hugeicons/core-free-icons"
import { usePathname } from "next/navigation"
import { use } from "react"

import { CoreContext } from "@/app/(core)/_providers/core-provider"
import { Badge } from "@/components/ui/badge"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar"

import SidebarItem from "../core/sidebar-item"

export default function MainMenu() {
  const pathname = usePathname()

  const { taskPendingList } = use(CoreContext)

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

        <SidebarMenu>
          <SidebarItem
            badge={
              taskPendingList.length > 0 ? (
                <Badge variant="outline">{taskPendingList.length}</Badge>
              ) : null
            }
            href="/task"
            icon={Task01Icon}
            isActive={pathname === "/task"}
            label="Tugas"
          />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
