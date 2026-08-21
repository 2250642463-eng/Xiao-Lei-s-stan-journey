import { useLoginForm } from '../hooks/useLoginForm'
import styles from './LoginForm.module.css'

interface LoginFormProps {
  onNavigateToApply: () => void
  onSuccess?: () => void
}

export function LoginForm({ onNavigateToApply, onSuccess }: LoginFormProps) {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useLoginForm({ onSuccess })

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>进入空间站</h2>
      <p className={styles.hint}>棒棒棠专属通道 ✨</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="username" className={styles.label}>
            粉丝昵称 <span className={styles.required}>*</span>
          </label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={styles.input}
            placeholder="请输入粉丝昵称"
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
          <label htmlFor="authCode" className={styles.label}>
            授权码 <span className={styles.required}>*</span>
          </label>
          <input
            id="authCode"
            type="text"
            name="authCode"
            value={formData.authCode}
            onChange={handleChange}
            className={styles.input}
            placeholder="请输入授权码"
            aria-invalid={!!errors.authCode}
            aria-describedby={errors.authCode ? 'authCode-error' : undefined}
          />
          {errors.authCode && (
            <span id="authCode-error" className={styles.error}>
              {errors.authCode}
            </span>
          )}
          <div className={styles.authCodeHint}>
            💡 提示：授权码是晓棠空间站的专属通行证
          </div>
        </div>

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
          {isLoading ? '验证中...' : '✨ 开启追星之旅'}
        </button>

        <div className={styles.footer}>
          还没有授权码？
          <button
            type="button"
            onClick={onNavigateToApply}
            className={styles.link}
          >
            申请授权
          </button>
        </div>
      </form>
    </div>
  )
}
