import { HeroSection } from './components/HeroSection'
import { LoginForm } from './components/LoginForm'
import styles from './index.module.css'

interface LoginProps {
  onNavigateToApply: () => void
  onLoginSuccess?: () => void
}

export default function Login({
  onNavigateToApply,
  onLoginSuccess,
}: LoginProps) {
  return (
    <div className={styles.container}>
      {/* 星星装饰 - 使用+号 */}
      <div className={`${styles.starDecor} ${styles.star1}`}>✦</div>
      <div className={`${styles.starDecor} ${styles.star2}`}>✦</div>
      <div className={`${styles.starDecor} ${styles.star3}`}>✦</div>
      <div className={`${styles.starDecor} ${styles.star4}`}>✦</div>
      <div className={`${styles.starDecor} ${styles.star5}`}>✦</div>
      <div className={`${styles.starDecor} ${styles.star6}`}>✦</div>
      <div className={`${styles.starDecor} ${styles.star7}`}>✦</div>
      <div className={`${styles.starDecor} ${styles.star8}`}>✦</div>

      <div className={styles.leftPanel}>
        <HeroSection />
      </div>
      <div className={styles.rightPanel}>
        <LoginForm
          onNavigateToApply={onNavigateToApply}
          onSuccess={onLoginSuccess}
        />
      </div>
    </div>
  )
}
