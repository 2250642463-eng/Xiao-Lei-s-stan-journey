import { useEffect, useState } from 'react'
import { CountdownCard } from './CountdownCard'
import styles from './CountdownSection.module.css'

export function CountdownSection() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 真实数据：9月11日生日，9月5日生日演唱会（使用当前年份或下一年）
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // 0-11 -> 1-12

  // 如果当前已经过了9月，就用下一年的日期
  const targetYear = currentMonth >= 9 ? currentYear + 1 : currentYear

  const birthday = new Date(`${targetYear}-09-11`)
  const nextEvent = new Date(`${targetYear}-09-05`)

  return (
    <div className={styles.container}>
      <CountdownCard
        title="距离晓棠生日还有"
        targetDate={birthday}
        currentDate={now}
        celebrationText="今天就是生日啦 🎂"
      />
      <CountdownCard
        title="距离生日演唱会还有"
        targetDate={nextEvent}
        currentDate={now}
        celebrationText="演出正在进行中 🎤"
      />
    </div>
  )
}
