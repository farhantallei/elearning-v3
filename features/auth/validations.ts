import z from "zod"

export function validateLoginInput(data: unknown) {
  const schema = z.object({
    token: z.string().nonempty({ error: "Token should not be empty" }),
  })

  return schema.parse(data)
}
