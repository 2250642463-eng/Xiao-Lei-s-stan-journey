import { useState, FormEvent, ChangeEvent } from 'react'
import { App, Button } from 'antd'
import { CopyOutlined, LoginOutlined } from '@ant-design/icons'
import styles from './ApplyAuthPage.module.css'

interface FormData {
  nickname: string
  feeling: string
  receiveMethod: string
}

interface ApplyAuthPageProps {
  onBack: () => void
}

export function ApplyAuthPage({ onBack }: ApplyAuthPageProps) {
  const { message } = App.useApp()

  const [formData, setFormData] = useState<FormData>({
    nickname: '',
    feeling: '',
    receiveMethod: 'page',
  })

  const [isLoading, setIsLoading] = useState(false)
  const [authCode, setAuthCode] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const generateAuthCode = (): string => {
    const prefix = 'XTTZ'
    const randomNum = Math.floor(Math.random() * 90000) + 10000
    const randomLetter = String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    )
    return `${prefix}${randomNum}${randomLetter}`
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!formData.nickname.trim()) {
      message.warning('请输入粉丝昵称')
      return
    }

    // 验证必须是"棒棒棠"
    if (formData.nickname !== '棒棒棠') {
      message.error('只有棒棒棠可以申请晓棠空间站授权哦 💙')
      return
    }

    // 模拟审核中
    setIsLoading(true)

    // 模拟后端审核延迟
    await new Promise(resolve => setTimeout(resolve, 1200))

    // 生成授权码
    const code = generateAuthCode()
    setAuthCode(code)

    // 保存到 localStorage，供登录时验证
    localStorage.setItem('validAuthCode', code)

    setShowSuccess(true)
    setIsLoading(false)
  }

  const handleCopy = async () => {
    if (authCode) {
      try {
        await navigator.clipboard.writeText(authCode)
        message.success('✅ 授权码已复制到剪贴板！')
      } catch {
        message.error('复制失败，请手动复制授权码')
      }
    }
  }

  const handleBackToLogin = () => {
    setShowSuccess(false)
    setAuthCode(null)
    onBack()
  }

  if (showSuccess && authCode) {
    return (
      <div className={styles.container}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>申请审核通过！</h2>
          <p className={styles.successSubtitle}>恭喜你获得晓棠空间站访问资格</p>

          <div className={styles.authCodeDisplay}>
            <label className={styles.authCodeLabel}>你的专属访问授权码</label>
            <div className={styles.authCodeValue}>{authCode}</div>
          </div>

          <div className={styles.warning}>
            ⚠️ 请复制保存授权码，刷新页面后不会保留
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type="primary"
              size="large"
              icon={<CopyOutlined />}
              onClick={handleCopy}
              className={styles.copyButton}
              block
            >
              复制授权码
            </Button>
            <Button
              size="large"
              icon={<LoginOutlined />}
              onClick={handleBackToLogin}
              className={styles.backButton}
              block
            >
              返回登录页
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <button onClick={onBack} className={styles.backLink}>
          ← 返回进入空间站
        </button>

        <h2 className={styles.title}>申请访问授权</h2>
        <p className={styles.subtitle}>棒棒棠・空间站访问资格申请 ✨</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="nickname" className={styles.label}>
              粉丝昵称 <span className={styles.required}>*</span>
            </label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className={styles.input}
              placeholder="请输入粉丝昵称"
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="feeling" className={styles.label}>
              入坑感言 <span className={styles.optional}>(选填)</span>
            </label>
            <textarea
              id="feeling"
              name="feeling"
              value={formData.feeling}
              onChange={handleChange}
              className={styles.textarea}
              placeholder="简单说说为什么喜欢晓棠吧~ 💙"
              rows={4}
              disabled={isLoading}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="receiveMethod" className={styles.label}>
              接收方式
            </label>
            <select
              id="receiveMethod"
              name="receiveMethod"
              value={formData.receiveMethod}
              onChange={handleChange}
              className={styles.select}
              disabled={isLoading}
            >
              <option value="page">仅页面展示</option>
              <option value="email" disabled>
                邮件接收（暂不支持）
              </option>
              <option value="sms" disabled>
                短信接收（暂不支持）
              </option>
            </select>
            <div className={styles.hint}>
              💡 此为练手项目，授权码仅在当前页面展示
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={styles.submitButton}
          >
            {isLoading ? (
              <>
                <span className={styles.spinner}></span>
                审核中...
              </>
            ) : (
              '✨ 提交申请'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
