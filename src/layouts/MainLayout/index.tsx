import { ReactNode } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import styles from './index.module.css'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  )
}
