'use client'

import React, { FC, KeyboardEvent, ChangeEvent } from 'react'
import { ITableBody } from '@/ts/table'
import EditableRow from './EditableRow'
import StaticRow from './StaticRow'

interface ITableRowProps {
  row: ITableBody
  level: number
  editingRowId: number | null
  editingData: ITableBody | null
  onDoubleClick: (row: ITableBody) => void
  onCreateRow: (id: number) => void
  onDeleteRow: (id: number) => void
  onChange: (e: ChangeEvent<HTMLInputElement>, field: keyof ITableBody) => void
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
}

const TableRow: FC<ITableRowProps> = ({
  row,
  level,
  editingRowId,
  editingData,
  onDoubleClick,
  onCreateRow,
  onDeleteRow,
  onChange,
  onKeyDown,
}) => {
  return (
    <React.Fragment key={row.id}>
      {editingRowId === row.id ? (
        <EditableRow
          row={row}
          level={level}
          editingData={editingData}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onCreateRow={onCreateRow}
          onDeleteRow={onDeleteRow}
        />
      ) : (
        <StaticRow
          row={row}
          level={level}
          onDoubleClick={onDoubleClick}
          onCreateRow={onCreateRow}
          onDeleteRow={onDeleteRow}
        />
      )}
      {row.child &&
        row.child.length > 0 &&
        row.child.map((childRow) => (
          <TableRow
            key={childRow.id}
            row={childRow}
            level={level + 1}
            editingRowId={editingRowId}
            editingData={editingData}
            onDoubleClick={onDoubleClick}
            onCreateRow={onCreateRow}
            onDeleteRow={onDeleteRow}
            onChange={onChange}
            onKeyDown={onKeyDown}
          />
        ))}
    </React.Fragment>
  )
}

export default TableRow
