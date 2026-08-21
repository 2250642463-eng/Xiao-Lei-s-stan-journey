import { App, Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import styles from './GallerySection.module.css'

export function GallerySection() {
  const { message } = App.useApp()

  const images = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    url: '/yaoxiaotang-stage.jpg',
    title: `精彩瞬间 ${i + 1}`,
  }))

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>💫 最新物料图集</h2>
        <Button
          type="link"
          icon={<RightOutlined />}
          iconPosition="end"
          onClick={() => message.info('图库页面开发中...')}
        >
          查看更多
        </Button>
      </div>
      <div className={styles.grid}>
        {images.map(img => (
          <div
            key={img.id}
            className={styles.imageCard}
            onClick={() => message.info(`${img.title} 大图预览开发中...`)}
          >
            <img src={img.url} alt={img.title} />
            <div className={styles.overlay}>
              <span className={styles.imageTitle}>{img.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
