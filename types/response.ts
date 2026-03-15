export type SingleResponse<T, U = Record<string, unknown>> = {
  result: T
} & U
