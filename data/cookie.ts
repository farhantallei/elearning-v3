const cookie = {
  SIDEBAR: (prefix: string) => `${prefix}_elearningv3_sidebar`,
  AUTH_TOKEN: (prefix: string) => `${prefix}_elearningv3_auth_token`,
  ENCRYPTED_KEY: (prefix: string) => `${prefix}_elearningv3_encrypted_key`,
  TOKEN_STORAGE: (prefix: string) => `${prefix}_elearningv3_token_storage`,
  PAGE_SIZE: (prefix: string) => `${prefix}_elearningv3_page_size`,
}

export default cookie
