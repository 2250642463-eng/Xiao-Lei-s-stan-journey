import { useState } from 'react'
import { App, Dropdown } from 'antd'
import type { MenuProps } from 'antd'
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import styles from './Header.module.css'

export function Header() {
  const { message } = App.useApp()
  const [activeMenu, setActiveMenu] = useState('home')

  // 从localStorage获取用户信息（模拟）
  const nickname = localStorage.getItem('fanNickname') || '棒棒棠'
  const isAdmin = false // 后续可以从用户数据中获取

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('fanNickname')
    message.success('退出登录成功')
    window.location.href = '/'
  }

  const handleAdmin = () => {
    message.info('管理功能开发中...')
  }

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: '个人资料',
      icon: <UserOutlined />,
      onClick: () => message.info('个人资料功能开发中...'),
    },
    ...(isAdmin
      ? [
          {
            key: 'admin',
            label: '管理入口',
            icon: <SettingOutlined />,
            onClick: handleAdmin,
          },
        ]
      : []),
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: '退出登录',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ]

  const menuItems = [
    { key: 'home', label: '首页', path: '/home' },
    { key: 'profile', label: '艺人档案', path: '/profile' },
    { key: 'schedule', label: '行程', path: '/schedule' },
    { key: 'gallery', label: '图库', path: '/gallery' },
    { key: 'favorites', label: '我的收藏', path: '/favorites' },
  ]

  const handleMenuClick = (key: string, path: string) => {
    setActiveMenu(key)
    message.info(`${path} 页面开发中...`)
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <div
          className={styles.logo}
          onClick={() => handleMenuClick('home', '/home')}
        >
          <span className={styles.logoText}>晓棠空间站</span>
          <span className={styles.logoIcon}>💙</span>
        </div>

        {/* 导航菜单 */}
        <nav className={styles.nav}>
          {menuItems.map(item => (
            <button
              key={item.key}
              className={`${styles.navItem} ${activeMenu === item.key ? styles.active : ''}`}
              onClick={() => handleMenuClick(item.key, item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* 用户下拉菜单 */}
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <button className={styles.userButton}>
            <UserOutlined className={styles.userIcon} />
            <span className={styles.userName}>{nickname}</span>
          </button>
        </Dropdown>
      </div>
    </header>
  )
}
