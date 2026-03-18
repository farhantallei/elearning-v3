export type TaskQuery = {
  classScheduleId: number
}

export type TaskModel = {
  college_program_category_id: number
  college_program_category_code: string
  college_program_category_name: string
  class_schedule_id: number
  lecturer_task_id: number
  lecturer_task_title: string
  lecturer_task_description: string
  lecturer_task_start_date: string
  lecturer_task_start_time: string
  lecturer_task_finish_date: string
  lecturer_task_finish_time: string
  lecturer_file_flag: string
  day_event: number
  session: string
  college_student_task_id: number | null
  nim: string | null
  college_student_task_title: string | null
  college_student_task_description: string | null
  college_student_task_date: string | null
  college_student_task_time: string | null
  file_flag: string | null

  course_name?: string
}
