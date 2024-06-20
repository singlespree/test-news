'use client'

import React, { FC, useCallback, KeyboardEvent } from 'react'
import { ITableBody } from '@/ts/table'
import styles from './TableBody.module.scss'
import { useTableData } from '@/hooks/useTableData'
import TableRow from './TableRow'

interface ITableBodyProps {
  data: ITableBody[]
}

const TableBody: FC<ITableBodyProps> = ({ data }) => {
  const {
    tableData,
    createRow,
    deleteRow,
    editingRowId,
    editingData,
    startEditing,
    changeEditingData,
    saveEditingData,
  } = useTableData(data)

  const handleDoubleClick = (row: ITableBody) => {
    if (!editingRowId) {
      startEditing(row)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ITableBody
  ) => {
    changeEditingData(field, e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      return saveEditingData()
    }
  }

  const renderRows = useCallback(
    (items: ITableBody[], level = 0) => {
      return items?.map((row) => (
        <TableRow
          key={row.id}
          row={row}
          level={level}
          editingRowId={editingRowId}
          editingData={editingData}
          onDoubleClick={handleDoubleClick}
          onCreateRow={createRow}
          onDeleteRow={deleteRow}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      ))
    },
    [createRow, deleteRow, editingRowId, editingData]
  )

  return <tbody className={styles.body}>{renderRows(tableData)}</tbody>
}

export default TableBody
