import { Carousel } from 'antd'
import styles from './Banner.module.css'

export function Banner() {
  const slides = [
    {
      id: 1,
      image: '/yaoxiaotang-stage.jpg',
      title: '晓棠最新舞台',
      subtitle: '用歌声点亮每一个夜晚',
    },
    {
      id: 2,
      image: '/yaoxiaotang-stage.jpg',
      title: '即将到来的演出',
      subtitle: '期待与你相遇',
    },
    {
      id: 3,
      image: '/yaoxiaotang-stage.jpg',
      title: '精彩瞬间回顾',
      subtitle: '那些难忘的时刻',
    },
  ]

  return (
    <div className={styles.bannerContainer}>
      <Carousel autoplay autoplaySpeed={3000} pauseOnHover dotPosition="bottom">
        {slides.map(slide => (
          <div key={slide.id} className={styles.slide}>
            <div
              className={styles.slideImage}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className={styles.slideOverlay}>
                <div className={styles.slideContent}>
                  <h2 className={styles.slideTitle}>{slide.title}</h2>
                  <p className={styles.slideSubtitle}>{slide.subtitle}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}
