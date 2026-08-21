import { HeroSection } from './components/HeroSection'
import { LoginForm } from './components/LoginForm'
import styles from './Login.module.css'

export function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <HeroSection />
      </div>
      <div className={styles.rightPanel}>
        <LoginForm />
      </div>
    </div>
  )
}
