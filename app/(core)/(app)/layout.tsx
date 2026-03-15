import { AppSidebar } from "@/components/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <>
      <AppSidebar />
      <SidebarInset
      // className="h-dvh overflow-hidden"
      >
        {children}
      </SidebarInset>
    </>
  )
}
