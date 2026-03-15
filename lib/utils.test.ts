import { describe, expect, it } from "bun:test"

import { arrayToStringRecord, cn } from "./utils"

describe("cn utility function", () => {
  it("merges classes", () => {
    expect(cn("text-sm", null, "text-lg")).toBe("text-lg")
  })
})

describe("arrayToStringRecord", () => {
  it("should convert string[] to string by taking the first element", () => {
    const input = {
      username: ["Required"],
      password: ["Too short", "Must contain number"],
    }

    const expected = {
      username: "Required",
      password: "Too short",
    }

    expect(arrayToStringRecord(input)).toEqual(expected)
  })

  it("should skip keys with undefined or empty array", () => {
    const input = {
      username: undefined,
      password: [],
      email: ["Invalid email"],
    }

    const expected = {
      email: "Invalid email",
    }

    expect(arrayToStringRecord(input)).toEqual(expected)
  })

  it("should return empty object if input is empty", () => {
    const input: Record<string, string[] | undefined> = {}
    expect(arrayToStringRecord(input)).toEqual({})
  })

  it("should work with mixed values", () => {
    const input = {
      field1: ["Error1"],
      field2: undefined,
      field3: ["Error3a", "Error3b"],
      field4: [],
    }

    const expected = {
      field1: "Error1",
      field3: "Error3a",
    }

    expect(arrayToStringRecord(input)).toEqual(expected)
  })

  // ===========================
  // New tests for keyMapper
  // ===========================
  it("should apply a custom keyMapper function", () => {
    const input = {
      username: ["Required"],
      password: ["Too short"],
    }

    const expected = {
      "user.username": "Required",
      "user.password": "Too short",
    }

    expect(arrayToStringRecord(input, (key) => `user.${key}`)).toEqual(expected)
  })

  it("should prefix keys with index", () => {
    const input = {
      username: ["Required"],
      password: ["Too short"],
    }

    const expected = {
      "0.username": "Required",
      "0.password": "Too short",
    }

    expect(arrayToStringRecord(input, (key) => `0.${key}`)).toEqual(expected)
  })

  it("should still skip undefined or empty arrays even with keyMapper", () => {
    const input = {
      username: undefined,
      password: [],
      email: ["Invalid email"],
    }

    const expected = {
      "prefix.email": "Invalid email",
    }

    expect(arrayToStringRecord(input, (key) => `prefix.${key}`)).toEqual(
      expected,
    )
  })
})
