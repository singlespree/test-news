import type { Metadata } from 'next'
import '../styles/normalize.css'
import '../styles/global.scss'
import React, { ReactNode } from 'react'
import styles from './layout.module.scss'
import Header from '@/components/Widgets/Header'
import AsidePanel from '@/components/Widgets/AsidePanel'

export const metadata: Metadata = {
  title: 'Title',
}

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.layout}>
          <Header />
          <AsidePanel />
          <div className={styles.children}>{children}</div>
        </div>
      </body>
    </html>
  )
}

export default Layout
