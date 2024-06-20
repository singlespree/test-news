'use client'

import React, { FC, KeyboardEvent } from 'react'
import { ITableBody } from '@/ts/table'
import styles from './TableBody.module.scss'

interface IEditableCellProps {
  field: keyof ITableBody
  type?: string
  value: string | number
  onChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ITableBody
  ) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

const EditableCell: FC<IEditableCellProps> = ({
  field,
  type = 'text',
  value,
  onChange,
  onKeyDown,
}) => (
  <td>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e, field)}
      onKeyDown={onKeyDown}
      className={styles.input}
    />
  </td>
)

export default EditableCell
