import { describe, expect, it } from "bun:test"

import { arrayToStringRecord, cn, getInitials, sortByDayName } from "./utils"

describe("cn utility function", () => {
  it("merges classes", () => {
    expect(cn("text-sm", null, "text-lg")).toBe("text-lg")
  })
})

describe("getInitials", () => {
  it("returns ? when no name is provided", () => {
    expect(getInitials()).toBe("?")
  })

  it("returns initials from first and last name", () => {
    expect(getInitials("  john doe ")).toBe("JD")
  })

  it("returns the first letter for a single name", () => {
    expect(getInitials("Single")).toBe("S")
  })

  it("ignores middle names", () => {
    expect(getInitials("Alice Bob Carol")).toBe("AB")
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

describe("sortByDayName", () => {
  it("sorts from Senin to Minggu", () => {
    const input = [
      { hari: "Minggu" },
      { hari: "Rabu" },
      { hari: "Senin" },
      { hari: "Jumat" },
    ]
    const result = sortByDayName(input, (i) => i.hari)
    expect(result.map((i) => i.hari)).toEqual([
      "Senin",
      "Rabu",
      "Jumat",
      "Minggu",
    ])
  })

  it("keeps stable order for same day", () => {
    const input = [
      { hari: "Selasa", name: "A" },
      { hari: "Senin", name: "B" },
      { hari: "Selasa", name: "C" },
    ]
    const result = sortByDayName(input, (i) => i.hari)
    expect(result.map((i) => i.name)).toEqual(["B", "A", "C"])
  })

  it("puts unknown day at the end", () => {
    const input = [{ hari: "Unknown" }, { hari: "Senin" }]
    const result = sortByDayName(input, (i) => i.hari)
    expect(result.map((i) => i.hari)).toEqual(["Senin", "Unknown"])
  })

  it("does not mutate the original array", () => {
    const input = [{ hari: "Jumat" }, { hari: "Senin" }]
    const original = [...input]
    sortByDayName(input, (i) => i.hari)
    expect(input).toEqual(original)
  })
})
