import { cn } from "@/lib/utils"

type PageShellProps = { className?: string } & React.PropsWithChildren

export function PageShell({ className, children }: PageShellProps) {
  return (
    <div className={cn("space-y-4 overflow-y-auto p-4", className)}>
      {children}
    </div>
  )
}

type PageShellHeaderProps = { className?: string } & React.PropsWithChildren

export function PageShellHeader({ className, children }: PageShellHeaderProps) {
  return <div className={cn("space-y-1", className)}>{children}</div>
}

type PageShellTitleProps = { className?: string } & React.PropsWithChildren

export function PageShellTitle({ className, children }: PageShellTitleProps) {
  return <h2 className={cn("font-bold text-2xl", className)}>{children}</h2>
}

type PageShellDescriptionProps = {
  className?: string
} & React.PropsWithChildren

export function PageShellDescription({
  className,
  children,
}: PageShellDescriptionProps) {
  return (
    <p className={cn("text-muted-foreground text-sm", className)}>{children}</p>
  )
}
