import { elearningFetcher } from "@/lib/fetcher"
import type { ListNestedResponse } from "@/types/response"

import type { SubjectModel } from "./types"

export async function getSubjectList() {
  const res = await elearningFetcher<ListNestedResponse<SubjectModel>>(
    "/college-student/navbar-courses/get",
  )()

  return res.response.result
}
