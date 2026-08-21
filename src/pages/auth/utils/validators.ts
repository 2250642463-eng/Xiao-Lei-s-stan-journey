/**
 * 验证用户名
 */
export function validateUsername(username: string): string | null {
  if (!username) {
    return '请输入粉丝昵称'
  }

  if (username.length < 2) {
    return '昵称至少需要2个字符'
  }

  if (username.length > 20) {
    return '昵称不能超过20个字符'
  }

  return null
}

/**
 * 验证密码
 */
export function validatePassword(password: string): string | null {
  if (!password) {
    return '请输入密码'
  }

  if (password.length < 6) {
    return '密码至少需要6个字符'
  }

  return null
}
