import { buildQueryParams } from "@farhantallei/fetcher/helper"

import { elearningFetcher } from "@/lib/fetcher"
import type { ListNestedResponse } from "@/types/response"

import type { TaskModel, TaskQuery } from "./types"

export async function getTaskList(query: TaskQuery) {
  const q = buildQueryParams(query)

  const res = await elearningFetcher<ListNestedResponse<TaskModel>>(
    "/college-student/task/get-task-all",
    q,
  )()

  return res.response.result
}
