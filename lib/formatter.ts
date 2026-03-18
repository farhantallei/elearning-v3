import { differenceInCalendarDays } from "date-fns"

export function getDaysRemaining(finishDate: string): string {
  const diff = differenceInCalendarDays(new Date(finishDate), new Date())
  if (diff > 0) return `${diff} hari lagi`
  if (diff === 0) return "Hari ini"
  return `Terlambat ${Math.abs(diff)} hari`
}
