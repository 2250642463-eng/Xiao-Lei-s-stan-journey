interface User {
  id: string
  username: string
  nickname: string
  password: string
}

interface LoginResult {
  success: boolean
  message: string
  user?: Omit<User, 'password'>
}

// Mock 用户数据
const mockUsers: User[] = [
  {
    id: '1',
    username: '棒棒棠',
    nickname: '棒棒棠',
    password: '123456',
  },
  {
    id: '2',
    username: '小棠粉',
    nickname: '小棠粉',
    password: '123456',
  },
  {
    id: '3',
    username: '姚姚应援团',
    nickname: '姚姚应援团',
    password: '123456',
  },
]

/**
 * Mock 登录函数
 */
export async function mockLogin(
  username: string,
  password: string
): Promise<LoginResult> {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  const user = mockUsers.find(
    u => u.username === username && u.password === password
  )

  if (user) {
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
    message: '用户名或密码错误',
  }
}
