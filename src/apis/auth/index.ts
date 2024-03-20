import type {
  CaptchaImgVo,
  ForgetEmailCodeDto,
  LoginDto,
  LoginVo,
  RegisterDto,
  RegisterEmailCodeDto,
  ResetPasswordDto,
} from '@/apis/auth/types'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants/storage-keys'
import { redirectToLogin } from '@/router'
import { localCache } from '@/utils/cache'
import { request } from '@/utils/request'

export * from './types'

export function register(data: RegisterDto) {
  return request.post('/auth/register', { data })
}

export function checkUsername(username: string) {
  return request.get<boolean>('/auth/checkusername', {
    params: { username },
  })
}

export function getCaptchaImg() {
  return request.get<CaptchaImgVo>('/auth/captcha/img')
}

export function login(data: LoginDto) {
  return request.post<LoginVo>('/auth/login', { data })
}

export function sendForgetEmailCode(data: ForgetEmailCodeDto) {
  return request.post('/auth/email/resetpassword', { data })
}

export function resetPassword(data: ResetPasswordDto) {
  return request.patch('/auth/resetpassword', { data })
}

export function sendRegisterEmailCode(data: RegisterEmailCodeDto) {
  return request.post('/auth/email/register', { data })
}

export async function refreshToken() {
  const token = localCache.get(REFRESH_TOKEN_KEY)
  if (!token) {
    redirectToLogin()
    return
  }

  const [res, err] = await request.post<LoginVo>('/auth/refresh', {
    data: {
      refreshToken: token,
    },
  })

  if (err) {
    redirectToLogin()
    return
  }

  localCache.set(ACCESS_TOKEN_KEY, res.accessToken)
  localCache.set(REFRESH_TOKEN_KEY, res.refreshToken)
}
