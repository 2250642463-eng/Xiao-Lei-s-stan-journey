/**
 * 验证粉丝昵称 - 必须是"棒棒棠"
 */
export function validateUsername(username: string): string | null {
  if (!username) {
    return '请输入粉丝昵称'
  }

  if (username !== '棒棒棠') {
    return '只有棒棒棠可以进入晓棠空间站哦 💙'
  }

  return null
}

/**
 * 验证授权码
 */
export function validateAuthCode(authCode: string): string | null {
  if (!authCode) {
    return '请输入授权码'
  }

  if (authCode.length < 6) {
    return '授权码格式不正确'
  }

  return null
}
