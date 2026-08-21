import { App, Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import styles from './ArtistProfile.module.css'

export function ArtistProfile() {
  const { message } = App.useApp()

  const handleViewProfile = () => {
    message.info('艺人档案页面开发中...')
  }

  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <img src="/yaoxiaotang-stage.jpg" alt="姚晓棠" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>姚晓棠</h3>
        <p className={styles.bio}>
          新生代实力唱将，用歌声传递温暖与力量。舞台上的她光芒四射，生活中的她温柔可爱。
          每一次演出都是与粉丝们的美好相遇，让我们一起见证她的成长与蜕变。
        </p>
        <Button
          type="primary"
          size="large"
          icon={<RightOutlined />}
          iconPosition="end"
          onClick={handleViewProfile}
          className={styles.button}
        >
          查看完整档案
        </Button>
      </div>
    </div>
  )
}
