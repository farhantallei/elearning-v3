import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
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
