'use client'

import styles from './Table.module.scss'
import React, { FC } from 'react'
import TableHead from './TableHead'
import TableBody from './TableBody/TableBody'
import { ITableBody } from '@/ts/table'

interface ITableProps {
  data: ITableBody[]
}

const Table: FC<ITableProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <TableHead />
        <TableBody data={data} />
      </table>
    </div>
  )
}

export default Table
