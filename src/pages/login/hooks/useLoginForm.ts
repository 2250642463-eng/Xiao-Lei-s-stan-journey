import { useState, FormEvent, ChangeEvent } from 'react'
import { App } from 'antd'
import { mockLogin } from '@/api/auth'
import { validateUsername, validateAuthCode } from '../utils/validators'

interface FormData {
  username: string
  authCode: string
  remember: boolean
}

interface FormErrors {
  username?: string
  authCode?: string
  submit?: string
}

interface UseLoginFormProps {
  onSuccess?: () => void
}

export function useLoginForm({ onSuccess }: UseLoginFormProps = {}) {
  const { message } = App.useApp()

  const [formData, setFormData] = useState<FormData>({
    username: '',
    authCode: '',
    remember: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // 清除对应字段的错误
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 验证表单
    const newErrors: FormErrors = {}

    const usernameError = validateUsername(formData.username)
    if (usernameError) newErrors.username = usernameError

    const authCodeError = validateAuthCode(formData.authCode)
    if (authCodeError) newErrors.authCode = authCodeError

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // 提交登录
    setIsLoading(true)
    setErrors({})

    try {
      const result = await mockLogin(formData.username, formData.authCode)

      if (result.success) {
        // 保存登录状态和用户信息
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('fanNickname', result.user?.nickname || '棒棒棠')

        message.success(
          `🎉 登录成功！欢迎 ${result.user?.nickname}，开启追星之旅！`
        )

        // 延迟一下再跳转，让用户看到成功提示
        setTimeout(() => {
          onSuccess?.()
        }, 800)
      } else {
        setErrors({ submit: result.message })
      }
    } catch {
      setErrors({ submit: '登录失败，请重试' })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
  }
}
