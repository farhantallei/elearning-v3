import { cn } from "@/lib/utils"

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <div
      className={cn(
        "mx-auto min-h-dvh w-full min-w-0 content-center items-start gap-8 bg-muted p-4 pt-2 sm:gap-12 sm:p-6 md:gap-8 lg:p-12",
      )}
    >
      <div className="mx-auto max-w-md">{children}</div>
    </div>
  )
}
