export type SingleResponse<T, U = Record<string, unknown>> = {
  result: T
} & U

export type ListResponse<T, U = Record<string, unknown>> = {
  result: T[]
} & U

export type ListNestedResponse<T, U = Record<string, unknown>> = {
  response: {
    result: T[]
  }
} & U
