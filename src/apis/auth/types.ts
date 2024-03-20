export interface LoginDto {
  username: string
  password: string
  key: string
  code: string
}

export interface LoginVo {
  accessToken: string
  refreshToken: string
}

export interface RegisterEmailCodeDto {
  email: string
}
export interface ForgetEmailCodeDto {
  username: string
  email: string
}

export interface ResetPasswordDto {
  username: string
  email: string
  code: string
  password: string
}

export interface RegisterDto {
  username: string
  email: string
  code: string
  password: string
}

export interface CaptchaImgVo {
  img: string
  id: string
}
