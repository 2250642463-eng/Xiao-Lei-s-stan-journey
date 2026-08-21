import { useLoginForm } from '../hooks/useLoginForm'
import { CaptchaInput } from './CaptchaInput'
import styles from './LoginForm.module.css'

export function LoginForm() {
  const {
    formData,
    errors,
    captcha,
    isLoading,
    handleChange,
    handleSubmit,
    refreshCaptcha,
  } = useLoginForm()

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>登录</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            粉丝昵称
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            placeholder="输入你的昵称"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'username-error' : undefined}
          />
          {errors.username && (
            <span id="username-error" className={styles.error}>
              {errors.username}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            密码
          </label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
            placeholder="输入密码"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <span id="password-error" className={styles.error}>
              {errors.password}
            </span>
          )}
        </div>

        <CaptchaInput
          captcha={captcha}
          value={formData.captcha}
          onChange={handleChange}
          onRefresh={refreshCaptcha}
          error={errors.captcha}
        />

        <div className={styles.checkboxField}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className={styles.checkbox}
            />
            记住我
          </label>
        </div>

        {errors.submit && (
          <div className={styles.submitError}>{errors.submit}</div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={styles.submitButton}
        >
          {isLoading ? '登录中...' : '登录'}
        </button>

        <div className={styles.footer}>
          还没有账号？
          <a href="#" className={styles.link}>
            注册
          </a>
        </div>
      </form>
    </div>
  )
}
