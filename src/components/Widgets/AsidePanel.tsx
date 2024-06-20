'use client'

import styles from './AsidePanel.module.scss'
import React from 'react'
import asidePanelItems from '@/constants/asidePanel'
import NavItemSvg from '../../../public/icons/nav-item.svg'
import ArrowSvg from '../../../public/icons/arrow-down.svg'

export default function AsidePanel() {
  const panelItems = asidePanelItems.map(({ name, key }) => (
    <li key={key} className={styles.item}>
      <NavItemSvg />
      {name}
    </li>
  ))

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1 className={styles.title}>Название проекта</h1>
          <p className={styles.description}>Аббревиатура</p>
        </div>
        <ArrowSvg />
      </div>
      <nav>
        <ul className={styles.list}>{panelItems}</ul>
      </nav>
    </div>
  )
}
