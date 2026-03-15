"use client"

import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import Link from "next/link"

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

type SidebarItemProps = {
  label: string
  href: string
  icon: IconSvgElement
  isActive?: boolean
}

export default function SidebarItem({
  label,
  href,
  icon,
  isActive = false,
}: SidebarItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        isActive={isActive}
        render={<Link href={href} />}
        tooltip={label}
      >
        <HugeiconsIcon icon={icon} strokeWidth={2} />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
