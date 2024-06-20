'use client'

import React, { FC, ChangeEvent, KeyboardEvent } from 'react'
import { ITableBody } from '@/ts/table'
import EditableCell from './EditableCell'
import styles from './TableBody.module.scss'
import RowActions from '@/components/Widgets/Table/TableBody/RowActions'

interface EditableRowProps {
  row: ITableBody
  level: number
  editingData: ITableBody | null
  onChange: (e: ChangeEvent<HTMLInputElement>, field: keyof ITableBody) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  onCreateRow: (id: number) => void
  onDeleteRow: (id: number) => void
}

const EditableRow: FC<EditableRowProps> = ({
  row,
  level,
  editingData,
  onChange,
  onKeyDown,
  onCreateRow,
  onDeleteRow,
}) => {
  const { id } = row

  return (
    <tr className={styles.bodyContent}>
      <RowActions
        id={id}
        level={level}
        onCreateRow={onCreateRow}
        onDeleteRow={onDeleteRow}
      />
      <EditableCell
        field="rowName"
        value={editingData?.rowName || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <EditableCell
        field="salary"
        type="number"
        value={editingData?.salary || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <EditableCell
        field="equipmentCosts"
        type="number"
        value={editingData?.equipmentCosts || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <EditableCell
        field="overheads"
        type="number"
        value={editingData?.overheads || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <EditableCell
        field="estimatedProfit"
        type="number"
        value={editingData?.estimatedProfit || ''}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </tr>
  )
}

export default EditableRow
