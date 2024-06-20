import React, { FC, useCallback, KeyboardEvent } from 'react'
import FileSvg from '../../../../public/icons/file.svg'
import TrashSvg from '../../../../public/icons/trash.svg'
import { ITableBody } from '@/ts/table'
import styles from './TableBody.module.scss'
import { useTableData } from '@/hooks/useTableData'
import deleteRow from '@/api/deleteRow'

interface ITableBodyProps {
  data: ITableBody[]
}

const TableBody: FC<ITableBodyProps> = ({ data }) => {
  const {
    tableData,
    createRow,
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
      saveEditingData()
    }
  }

  const getEditingValue = (field: keyof ITableBody): string | number => {
    const value = editingData ? editingData[field] : ''
    return typeof value === 'string' || typeof value === 'number' ? value : ''
  }

  const renderEditableCell = (
    field: keyof ITableBody,
    type: string = 'text'
  ) => (
    <td>
      <input
        type={type}
        value={getEditingValue(field)}
        onChange={(e) => handleChange(e, field)}
        onKeyDown={handleKeyDown}
      />
    </td>
  )

  const handleCreateRow = (id: number) => {
    if (!editingRowId) {
      createRow(id)
    }
  }

  const renderRows = useCallback(
    (items: ITableBody[], level = 0) => {
      return items?.map(
        (
          {
            rowName,
            salary,
            equipmentCosts,
            overheads,
            estimatedProfit,
            id,
            child,
          },
          idx
        ) => (
          <React.Fragment key={idx}>
            {editingRowId === id ? (
              <tr className={styles.bodyContent}>
                <td className={styles.level}>
                  <FileSvg
                    style={{ paddingLeft: `${level * 20}px` }}
                    onClick={() => handleCreateRow(id)}
                  />
                  <TrashSvg
                    className={styles.trashSvg}
                    onClick={() => handleCreateRow(id)}
                  />
                </td>
                {renderEditableCell('rowName')}
                {renderEditableCell('salary', 'number')}
                {renderEditableCell('equipmentCosts', 'number')}
                {renderEditableCell('overheads', 'number')}
                {renderEditableCell('estimatedProfit', 'number')}
              </tr>
            ) : (
              <tr
                className={styles.bodyContent}
                onDoubleClick={() =>
                  handleDoubleClick({
                    id,
                    rowName,
                    salary,
                    equipmentCosts,
                    overheads,
                    estimatedProfit,
                    child,
                    total: 0,
                    mimExploitation: 0,
                    machineOperatorSalary: 0,
                    materials: 0,
                    mainCosts: 0,
                    supportCosts: 0,
                  })
                }
              >
                <td className={styles.level}>
                  <FileSvg
                    style={{ paddingLeft: `${level * 20}px` }}
                    onClick={() => handleCreateRow(id)}
                  />
                  <TrashSvg
                    className={styles.trashSvg}
                    onClick={() => deleteRow(id)}
                  />
                </td>
                <td>{rowName}</td>
                <td>{salary}</td>
                <td>{equipmentCosts}</td>
                <td>{overheads}</td>
                <td>{estimatedProfit}</td>
              </tr>
            )}
            {child && child.length > 0 && renderRows(child, level + 1)}
          </React.Fragment>
        )
      )
    },
    [createRow, editingRowId, editingData]
  )

  return <tbody className={styles.body}>{renderRows(tableData)}</tbody>
}

export default TableBody
