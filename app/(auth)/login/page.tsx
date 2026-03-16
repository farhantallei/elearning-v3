"use client"

import { useRouter } from "next/navigation"

import SpinnerWrapper from "@/components/common/spinner-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardPanel, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginAction } from "@/features/auth/actions"
import { useForm } from "@/hooks/use-form"

export default function Page() {
  const router = useRouter()

  const { isLoading, errors, onSubmit } = useForm({
    action: loginAction,
    onSuccess: () => {
      router.push("/")
    },
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardPanel>
        <Form errors={errors} onSubmit={onSubmit}>
          <Field name="encrypted_key">
            <FieldLabel>Encrypted Key</FieldLabel>
            <Input placeholder="Input encrypted key" />
            <FieldError />
          </Field>

          <Field name="token">
            <FieldLabel>Token</FieldLabel>
            <Input placeholder="Input token" />
            <FieldError />
          </Field>

          <Button disabled={isLoading} type="submit">
            <SpinnerWrapper loading={isLoading} />
            Submit
          </Button>
        </Form>
      </CardPanel>
    </Card>
  )
}
