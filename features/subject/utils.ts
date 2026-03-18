import { sortByDayName } from "@/lib/utils"

import type { SubjectModel } from "./types"

export function sortSubjectList(subjectList: SubjectModel[]): SubjectModel[] {
  const sortedByTime = [...subjectList].sort((a, b) =>
    a.detail.class_start_time.localeCompare(b.detail.class_start_time),
  )
  return sortByDayName(sortedByTime, (s) => s.detail.day_name)
}
