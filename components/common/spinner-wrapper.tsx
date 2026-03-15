import { cn } from "@/lib/utils"
import { Spinner } from "../ui/spinner"

type SpinnerWrapperProps = {
  loading?: boolean
  className?: string
} & React.PropsWithChildren

export default function SpinnerWrapper({
  loading,
  className,
  children,
}: SpinnerWrapperProps) {
  return loading ? <Spinner className={cn(className)} /> : children
}
