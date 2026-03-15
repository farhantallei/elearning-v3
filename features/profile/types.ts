export type ProfileQuery = {
  encryptedKey: string
}

export type ProfileModel = {
  college_student_id: number
  full_name: string
  nim: string
  major_id: number
  major_code: string
  major_name_id: string
  class_category_code: string
  handphone_number: string // prefix: 628
  semester_id: number
  semester_name: string
  concentration_id: number
  concentration_name: string
  school_year_id: number
  school_year_name: string
  remaining_credits: string
  guardian_lecturer_name: string
  guardian_lecturer_email: string
  status_guardianship: "Sudah Perwalian" | (string & {})
  email: string
  entry_year: string
  status_guardianship_value: boolean
  status_guardianship_detail_value: boolean
  score: {
    ips_target: number
    ips_running: number
    ipk: number
    target_semester: number
  }
}

export type ProfileDpQuery = {
  encryptedKey: string
  tokenStorage: string
}

export type ProfileDpModel = {
  title: string | null
  description: string | null
  username: string
  folder: string
  flag: string
  file_name: string
  file_path: string
  file_extension: string
  file_content_base64: string
}
