'use client'

import styles from './TableHead.module.scss'
import React from 'react'

export default function TableHead() {
  return (
    <thead className={styles.head}>
      <tr className={styles.headContent}>
        <th className={styles.level}>Уровень</th>
        <th className={styles.rowName}>Наименование работ</th>
        <th className={styles.salary}>Основная з/п</th>
        <th className={styles.equipmentCosts}>Оборудование</th>
        <th className={styles.overheads}>Накладные расходы</th>
        <th className={styles.estimatedProfit}>Сметная прибыль</th>
      </tr>
    </thead>
  )
}
