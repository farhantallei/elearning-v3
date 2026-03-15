import Link from "next/link"
import { Fragment, useId } from "react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb"
import { Separator } from "../ui/separator"
import { SidebarTrigger } from "../ui/sidebar"

type HeaderProps = {
  breadcrumbs?: {
    label: string
    href?: string
    active?: boolean
  }[]
}

export default function Header({ breadcrumbs = [] }: HeaderProps) {
  const id = useId()

  return (
    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 overflow-hidden border-b bg-background/90 px-4 backdrop-blur-lg">
      <SidebarTrigger className="-ml-1" />
      <Separator className="mr-2 h-4!" orientation="vertical" />
      <Breadcrumb className="flex-1 shrink-0 basis-[calc(100%-255px)] overflow-hidden">
        <BreadcrumbList className="flex-nowrap">
          {breadcrumbs.map((crumb, idx) => (
            <Fragment key={String(`${id}-crumb-${idx}`)}>
              {idx > 0 ? <BreadcrumbSeparator /> : null}
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink
                    className="max-w-40 truncate"
                    render={<Link href={crumb.href} />}
                  >
                    {crumb.label}
                  </BreadcrumbLink>
                ) : crumb.active ? (
                  <BreadcrumbPage className="max-w-40 truncate">
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  crumb.label
                )}
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
