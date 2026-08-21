import { useState } from 'react'
import { App } from 'antd'
import { PlayCircleOutlined, VideoCameraOutlined } from '@ant-design/icons'
import styles from './WorksSection.module.css'

type WorkType = '全部' | '音乐' | '影视'

export function WorksSection() {
  const { message } = App.useApp()
  const [activeFilter, setActiveFilter] = useState<WorkType>('全部')

  const works = [
    {
      id: 1,
      title: '星光之旅',
      type: '音乐',
      cover: '/yaoxiaotang-stage.jpg',
      year: '2024',
    },
    {
      id: 2,
      title: '追梦人',
      type: '音乐',
      cover: '/yaoxiaotang-stage.jpg',
      year: '2024',
    },
    {
      id: 3,
      title: '青春剧场',
      type: '影视',
      cover: '/yaoxiaotang-stage.jpg',
      year: '2023',
    },
    {
      id: 4,
      title: '夜空中最亮的星',
      type: '音乐',
      cover: '/yaoxiaotang-stage.jpg',
      year: '2023',
    },
    {
      id: 5,
      title: '梦想成真',
      type: '影视',
      cover: '/yaoxiaotang-stage.jpg',
      year: '2024',
    },
    {
      id: 6,
      title: '勇敢前行',
      type: '音乐',
      cover: '/yaoxiaotang-stage.jpg',
      year: '2024',
    },
  ]

  const filteredWorks =
    activeFilter === '全部' ? works : works.filter(w => w.type === activeFilter)

  const filters: WorkType[] = ['全部', '音乐', '影视']

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>🌟 推荐作品</h2>
        <div className={styles.filters}>
          {filters.map(filter => (
            <button
              key={filter}
              className={`${styles.filterButton} ${activeFilter === filter ? styles.active : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      <div className={styles.grid}>
        {filteredWorks.map(work => (
          <div
            key={work.id}
            className={styles.workCard}
            onClick={() => message.info(`${work.title} 详情页开发中...`)}
          >
            <div
              className={styles.cover}
              style={{ backgroundImage: `url(${work.cover})` }}
            >
              <div className={styles.overlay}>
                {work.type === '音乐' ? (
                  <PlayCircleOutlined className={styles.playIcon} />
                ) : (
                  <VideoCameraOutlined className={styles.playIcon} />
                )}
              </div>
              <div className={styles.badge}>{work.type}</div>
            </div>
            <div className={styles.info}>
              <h3 className={styles.workTitle}>{work.title}</h3>
              <p className={styles.year}>{work.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
