import type { TaskModel } from "./types"

export function groupTaskList(taskList: TaskModel[]): {
  pending: TaskModel[]
  missed: TaskModel[]
  completed: TaskModel[]
} {
  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`

  const pending: TaskModel[] = []
  const missed: TaskModel[] = []
  const completed: TaskModel[] = []

  for (const task of taskList) {
    if (task.college_student_task_id != null) {
      completed.push(task)
    } else if (task.lecturer_task_finish_date >= today) {
      pending.push(task)
    } else {
      missed.push(task)
    }
  }

  pending.sort(
    (a, b) =>
      a.lecturer_task_finish_date.localeCompare(b.lecturer_task_finish_date) ||
      a.lecturer_task_finish_time.localeCompare(b.lecturer_task_finish_time),
  )

  missed.sort(
    (a, b) =>
      b.lecturer_task_finish_date.localeCompare(a.lecturer_task_finish_date) ||
      b.lecturer_task_finish_time.localeCompare(a.lecturer_task_finish_time),
  )

  completed.sort(
    (a, b) =>
      b.lecturer_task_finish_date.localeCompare(a.lecturer_task_finish_date) ||
      b.lecturer_task_finish_time.localeCompare(a.lecturer_task_finish_time),
  )

  return { pending, missed, completed }
}
