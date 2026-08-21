import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={styles.copyright}>© 2024 晓棠空间站 粉丝站</p>
          <p className={styles.disclaimer}>本站为粉丝自发建立的非盈利站点</p>
        </div>
        <div className={styles.links}>
          <a href="#" className={styles.link}>
            关于我们
          </a>
          <span className={styles.divider}>|</span>
          <a href="#" className={styles.link}>
            联系方式
          </a>
          <span className={styles.divider}>|</span>
          <a href="#" className={styles.link}>
            免责声明
          </a>
        </div>
      </div>
    </footer>
  )
}
