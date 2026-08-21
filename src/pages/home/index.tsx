import { Banner } from './components/Banner'
import { CountdownSection } from './components/CountdownSection'
import { ArtistProfile } from './components/ArtistProfile'
import { ScheduleSection } from './components/ScheduleSection'
import { GallerySection } from './components/GallerySection'
import { WorksSection } from './components/WorksSection'
import styles from './index.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      {/* 大轮播Banner */}
      <Banner />

      <div className={styles.content}>
        {/* 倒计时卡片组 */}
        <CountdownSection />

        {/* 艺人简介 */}
        <ArtistProfile />

        {/* 近期舞台行程 */}
        <ScheduleSection />

        {/* 最新物料图集 */}
        <GallerySection />

        {/* 推荐作品 */}
        <WorksSection />
      </div>
    </div>
  )
}
