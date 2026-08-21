/**
 * 生成随机验证码
 */
export function generateCaptcha(length: number = 6): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // 去掉容易混淆的字符
  let captcha = ''

  for (let i = 0; i < length; i++) {
    captcha += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return captcha
}
