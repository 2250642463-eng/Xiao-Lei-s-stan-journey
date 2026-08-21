interface User {
  id: string
  username: string
  nickname: string
  authCode: string
}

interface LoginResult {
  success: boolean
  message: string
  user?: Omit<User, 'authCode'>
}

// Mock 用户数据 - 只有棒棒棠可以登录
const mockUsers: User[] = [
  {
    id: '1',
    username: '棒棒棠',
    nickname: '棒棒棠',
    authCode: 'XTTZ2024', // 默认测试授权码
  },
]

/**
 * Mock 登录函数 - 验证粉丝昵称和授权码
 */
export async function mockLogin(
  username: string,
  authCode: string
): Promise<LoginResult> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  // 验证粉丝昵称必须是"棒棒棠"
  if (username !== '棒棒棠') {
    return {
      success: false,
      message: '只有棒棒棠可以进入晓棠空间站哦 💙',
    }
  }

  // 检查 localStorage 中是否有有效的授权码（从申请页生成的）
  const validAuthCode = localStorage.getItem('validAuthCode')

  // 验证授权码：可以是默认测试码，也可以是新生成的码
  const isValidCode = authCode === 'XTTZ2024' || authCode === validAuthCode

  if (isValidCode) {
    const user = mockUsers[0] // 棒棒棠用户
    return {
      success: true,
      message: '登录成功',
      user: {
        id: user.id,
        username: user.username,
        nickname: user.nickname,
      },
    }
  }

  return {
    success: false,
    message: '授权码错误，请检查后重试',
  }
}
