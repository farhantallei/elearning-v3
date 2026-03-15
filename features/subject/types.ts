export type SubjectModel = {
  course_code: string
  credits: number
  course_name_id: string
  course_name_en: string
  detail: {
    college_program_category_id: number
    college_program_category_code: string
    college_program_category_name: string
    college_program_category_asynchronous_class: number
    lecturer_code: string
    lecturer_name: string
    lecturer_email: string
    handphone_number: string | null
    telephone_number: string | null
    semester_name: string
    class_code: string
    class_name: string
    concentration_code: string
    day_name: string
    class_start_time: string
    class_finish_time: string
    class_schedule_id: number
    lecturer_code_async: string | null
    lecturer_name_async: string | null
    lecturer_email_async: string | null
  }
}
