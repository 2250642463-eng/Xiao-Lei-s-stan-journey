import { App } from 'antd'
import styles from './ScheduleSection.module.css'

export function ScheduleSection() {
  const { message } = App.useApp()

  const schedules = [
    {
      id: 1,
      date: '2025-01-20',
      title: '新年音乐会',
      venue: '北京工人体育馆',
      image: '/yaoxiaotang-stage.jpg',
    },
    {
      id: 2,
      date: '2025-02-14',
      title: '情人节专场',
      venue: '上海梅赛德斯奔驰文化中心',
      image: '/yaoxiaotang-stage.jpg',
    },
    {
      id: 3,
      date: '2025-03-08',
      title: '女神节演唱会',
      venue: '深圳湾体育中心',
      image: '/yaoxiaotang-stage.jpg',
    },
    {
      id: 4,
      date: '2025-04-05',
      title: '春日音乐节',
      venue: '杭州奥体中心',
      image: '/yaoxiaotang-stage.jpg',
    },
    {
      id: 5,
      date: '2025-05-01',
      title: '五一特别演出',
      venue: '成都露天音乐公园',
      image: '/yaoxiaotang-stage.jpg',
    },
  ]

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>✨ 近期舞台行程</h2>
      <div className={styles.scrollContainer}>
        {schedules.map(item => (
          <div
            key={item.id}
            className={styles.card}
            onClick={() => message.info(`${item.title} 详情页开发中...`)}
          >
            <div
              className={styles.cardImage}
              style={{ backgroundImage: `url(${item.image})` }}
            />
            <div className={styles.cardContent}>
              <div className={styles.date}>{item.date}</div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.venue}>{item.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
