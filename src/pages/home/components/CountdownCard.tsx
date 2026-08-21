import styles from './CountdownCard.module.css'

interface CountdownCardProps {
  title: string
  targetDate: Date
  currentDate: Date
  celebrationText: string
}

export function CountdownCard({
  title,
  targetDate,
  currentDate,
  celebrationText,
}: CountdownCardProps) {
  const diff = targetDate.getTime() - currentDate.getTime()

  if (diff <= 0) {
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.celebration}>{celebrationText}</div>
      </div>
    )
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.countdown}>
        <div className={styles.timeBlock}>
          <div className={styles.timeValue}>{days}</div>
          <div className={styles.timeLabel}>天</div>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.timeBlock}>
          <div className={styles.timeValue}>
            {hours.toString().padStart(2, '0')}
          </div>
          <div className={styles.timeLabel}>时</div>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.timeBlock}>
          <div className={styles.timeValue}>
            {minutes.toString().padStart(2, '0')}
          </div>
          <div className={styles.timeLabel}>分</div>
        </div>
        <span className={styles.separator}>:</span>
        <div className={styles.timeBlock}>
          <div className={styles.timeValue}>
            {seconds.toString().padStart(2, '0')}
          </div>
          <div className={styles.timeLabel}>秒</div>
        </div>
      </div>
    </div>
  )
}
