import styles from './HeroSection.module.css'

export function HeroSection() {
  return (
    <div className={styles.container}>
      <div className={styles.sparkles}>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>
        <div className={styles.sparkle}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>✨ 晓棠空间站 ✨</h1>
        <p className={styles.subtitle}>欢迎棒棒棠</p>
        <p className={styles.slogan}>奔赴每一场舞台的星光之旅</p>
        <div className={styles.decoration}>
          <span className={styles.candy}>🍬</span>
          <span className={styles.star}>⭐</span>
          <span className={styles.candy}>🍬</span>
        </div>
      </div>
    </div>
  )
}
