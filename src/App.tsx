import { useState, useEffect } from 'react'
import { App as AntdApp } from 'antd'
import Login from './pages/login'
import { ApplyAuthPage } from './pages/login/ApplyAuthPage'
import { MainLayout } from './layouts/MainLayout'
import HomePage from './pages/home'
import './styles/global.css'

type Page = 'login' | 'apply-auth' | 'home'

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('login')

  // 检查登录状态
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
    if (isLoggedIn) {
      setCurrentPage('home')
    }
  }, [])

  if (currentPage === 'apply-auth') {
    return <ApplyAuthPage onBack={() => setCurrentPage('login')} />
  }

  if (currentPage === 'home') {
    return (
      <MainLayout>
        <HomePage />
      </MainLayout>
    )
  }

  return (
    <Login
      onNavigateToApply={() => setCurrentPage('apply-auth')}
      onLoginSuccess={() => setCurrentPage('home')}
    />
  )
}

function App() {
  return (
    <AntdApp>
      <AppContent />
    </AntdApp>
  )
}

export default App
