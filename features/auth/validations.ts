import z from "zod"

export function validateLoginInput(data: unknown) {
  const schema = z.object({
    encrypted_key: z
      .string()
      .nonempty({ error: "Encrypted key should not be empty" }),
    token: z.string().nonempty({ error: "Token should not be empty" }),
  })

  return schema.parse(data)
}
