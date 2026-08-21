import { ChangeEvent } from 'react'
import styles from './CaptchaInput.module.css'

interface CaptchaInputProps {
  captcha: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onRefresh: () => void
  error?: string
}

export function CaptchaInput({
  captcha,
  value,
  onChange,
  onRefresh,
  error,
}: CaptchaInputProps) {
  return (
    <div className={styles.field}>
      <label htmlFor="captcha" className={styles.label}>
        验证码
      </label>
      <div className={styles.captchaWrapper}>
        <input
          id="captcha"
          type="text"
          name="captcha"
          value={value}
          onChange={onChange}
          className={styles.input}
          placeholder="输入验证码"
          maxLength={6}
          aria-invalid={!!error}
          aria-describedby={error ? 'captcha-error' : undefined}
        />
        <div
          className={styles.captchaDisplay}
          aria-label={`验证码: ${captcha}`}
        >
          {captcha}
        </div>
        <button
          type="button"
          onClick={onRefresh}
          className={styles.refreshButton}
          aria-label="刷新验证码"
        >
          🔄
        </button>
      </div>
      {error && (
        <span id="captcha-error" className={styles.error}>
          {error}
        </span>
      )}
    </div>
  )
}
