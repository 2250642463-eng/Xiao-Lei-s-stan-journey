import { useState, FormEvent, ChangeEvent } from 'react'
import { mockLogin } from '../utils/mockAuth'
import { validateUsername, validatePassword } from '../utils/validators'
import { generateCaptcha } from '../utils/captchaGenerator'

interface FormData {
  username: string
  password: string
  captcha: string
  remember: boolean
}

interface FormErrors {
  username?: string
  password?: string
  captcha?: string
  submit?: string
}

export function useLoginForm() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    captcha: '',
    remember: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [captcha, setCaptcha] = useState(generateCaptcha())
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

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha())
    setFormData(prev => ({ ...prev, captcha: '' }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 验证表单
    const newErrors: FormErrors = {}

    const usernameError = validateUsername(formData.username)
    if (usernameError) newErrors.username = usernameError

    const passwordError = validatePassword(formData.password)
    if (passwordError) newErrors.password = passwordError

    if (formData.captcha.toLowerCase() !== captcha.toLowerCase()) {
      newErrors.captcha = '验证码错误'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // 提交登录
    setIsLoading(true)
    setErrors({})

    try {
      const result = await mockLogin(formData.username, formData.password)

      if (result.success) {
        alert(`登录成功！欢迎 ${result.user?.nickname}`)
        // 这里可以跳转到主页或其他操作
      } else {
        setErrors({ submit: result.message })
        refreshCaptcha()
      }
    } catch {
      setErrors({ submit: '登录失败，请重试' })
      refreshCaptcha()
    } finally {
      setIsLoading(false)
    }
  }

  return {
    formData,
    errors,
    captcha,
    isLoading,
    handleChange,
    handleSubmit,
    refreshCaptcha,
  }
}
