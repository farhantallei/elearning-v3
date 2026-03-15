import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import { HARI_ORDER } from "@/lib/constants"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

export function getInitials(name?: string | null): string {
  if (!name) return "?"

  const nameParts = name.trim().split(" ")
  const initials = nameParts.map((part) => part[0].toUpperCase()).join("")

  return initials.slice(0, 2)
}

export function arrayToStringRecord(
  input: Record<string, string[] | undefined>,
  keyMapper?: (key: string) => string,
): Record<string, string> {
  const result: Record<string, string> = {}

  for (const key in input) {
    const errors = input[key]
    if (errors && errors.length > 0) {
      const newKey = keyMapper ? keyMapper(key) : key
      result[newKey] = errors[0]
    }
  }

  return result
}

export function detectMimeType(base64: string) {
  if (base64.startsWith("/9j/")) return "image/jpeg"
  if (base64.startsWith("iVBORw0KGgo")) return "image/png"
  if (base64.startsWith("R0lGOD")) return "image/gif"
  if (base64.startsWith("UklGR")) return "image/webp"
  if (base64.startsWith("PHN2Zy")) return "image/svg+xml"

  return "image/jpeg"
}

export function base64ToDataUrl(base64: string) {
  if (base64.startsWith("data:")) return base64

  const mime = detectMimeType(base64)
  return `data:${mime};base64,${base64}`
}

export function sortByDayName<T>(
  items: T[],
  getDayName: (item: T) => string,
): T[] {
  return [...items].sort(
    (a, b) =>
      (HARI_ORDER[getDayName(a)] ?? 7) - (HARI_ORDER[getDayName(b)] ?? 7),
  )
}

export function buildCookieHeader(params: object) {
  return Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null)
    .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
    .join("; ")
}
