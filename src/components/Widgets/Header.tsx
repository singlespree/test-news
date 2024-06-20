'use client'

import styles from './Header.module.scss'
import React from 'react'
import GridSvg from '../../../public/icons/grid.svg'
import StepBackSvg from '../../../public/icons/step-back.svg'
import cn from 'classnames'

export default function Header() {
  return (
    <header className={styles.container}>
      <button type="button" className={cn(styles.button, styles.gridSvg)}>
        <GridSvg />
      </button>
      <button type="button" className={cn(styles.button, styles.stepBack)}>
        <StepBackSvg />
      </button>
      <button
        type="button"
        className={cn(styles.button, styles.view, styles.selected)}
      >
        Просмотр
      </button>
      <button type="button" className={cn(styles.button, styles.control)}>
        Управление
      </button>
    </header>
  )
}
