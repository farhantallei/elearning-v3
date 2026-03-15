import { useCallback, useState, useTransition } from "react"

import { toastManager } from "@/components/ui/toast"
import type { DalError, DalReturn } from "@/lib/dal/types"
import { arrayToStringRecord } from "@/lib/utils"

export type FieldErrors = Record<string, string>

type FormHookOptions<T> = {
  action: (formData: FormData) => Promise<DalReturn<T>>
  revalidation?: () => void | Promise<void>
  resetOnSuccess?: boolean
  onSuccess?: (data: T) => void
  onError?: (error: DalError) => void
}

export function useForm<T>({
  action,
  revalidation,
  resetOnSuccess = false,
  onSuccess,
  onError,
}: FormHookOptions<T>) {
  const [isPending, startTransition] = useTransition()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})

  const isLoading = isPending || isSubmitting

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    setErrors({})
    setIsSubmitting(true)

    startTransition(async () => {
      const result = await action(formData)

      if (result.success) {
        await revalidation?.()

        onSuccess?.(result.data)

        if (resetOnSuccess) setIsSubmitting(false)

        return
      }

      setIsSubmitting(false)

      if (result.error.type === "validation-error") {
        setErrors(arrayToStringRecord(result.error.error.fieldErrors))
      } else {
        onError?.(result.error)

        switch (result.error.type) {
          case "captcha-error":
            toastManager.add({
              title: "Verifikasi gagal",
              description:
                "Kami tidak dapat memverifikasi permintaan Anda. Silakan coba lagi.",
              type: "error",
            })
            break
          case "api-error":
            console.debug(result.error.error)
            toastManager.add({
              description: "API Error",
              type: "error",
            })
            break

          case "internal-error":
          case "unknown-error":
            if (result.error.type === "unknown-error") {
              console.debug(result.error.error)
            }
            toastManager.add({
              description: "An unexpected error occurred. Please try again.",
              type: "error",
            })
            break
        }
      }
    })
  }

  const clearFieldError = useCallback((name: string) => {
    setErrors((prev) => {
      if (!(name in prev)) return prev
      const next = { ...prev }
      delete next[name]
      return next
    })
  }, [])

  return {
    isLoading,
    isPending,
    isSubmitting,
    errors,
    onSubmit: handleSubmit,
    setErrors,
    clearFieldError,
  }
}
