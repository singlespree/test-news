'use client'

import React, { FC } from 'react'
import { ITableBody } from '@/ts/table'
import RowActions from './RowActions'
import styles from './TableBody.module.scss'

interface StaticRowProps {
  row: ITableBody
  level: number
  onDoubleClick: (row: ITableBody) => void
  onCreateRow: (id: number) => void
  onDeleteRow: (id: number) => void
}

const StaticRow: FC<StaticRowProps> = ({
  row,
  level,
  onDoubleClick,
  onCreateRow,
  onDeleteRow,
}) => {
  const { id, rowName, salary, equipmentCosts, overheads, estimatedProfit } =
    row

  return (
    <tr className={styles.bodyContent} onDoubleClick={() => onDoubleClick(row)}>
      <RowActions
        id={id}
        level={level}
        onCreateRow={onCreateRow}
        onDeleteRow={onDeleteRow}
      />
      <td>{rowName}</td>
      <td>{salary}</td>
      <td>{equipmentCosts}</td>
      <td>{overheads}</td>
      <td>{estimatedProfit}</td>
    </tr>
  )
}

export default StaticRow
