import { useState, useEffect, useCallback } from 'react'
import { ITableBody } from '@/ts/table'
import { addNewChild } from '@/utils/tableUtils'
import sendNewRow from '@/api/sendNewRow'
import updateRow from '@/api/updateRow'
import removeRow from '@/api/removeRow'

export const useTableData = (initialData: ITableBody[]) => {
  const [tableData, setTableData] = useState<ITableBody[]>(initialData)
  const [editingRowId, setEditingRowId] = useState<number | null>(null)
  const [editingData, setEditingData] = useState<ITableBody | null>(null)

  const createRow = useCallback(
    (parentId?: number) => {
      if (editingRowId) return
      setTableData((prevTableData) => {
        const { updatedItems, newRow } = addNewChild(prevTableData, parentId)

        if (newRow) {
          setEditingRowId(newRow.id)
          setEditingData({ ...newRow })
        }

        return updatedItems
      })
    },
    [editingRowId]
  )

  const updateLocalRow = useCallback((id: number, updatedData: ITableBody) => {
    const updateData = (data: ITableBody[]): ITableBody[] => {
      return data.map((row) => {
        if (row.id === id) {
          return { ...row, ...updatedData }
        }

        if (row.child) {
          return { ...row, child: updateData(row.child) }
        }

        return row
      })
    }

    setTableData((prevData) => updateData(prevData))
  }, [])

  const deleteLocalRow = useCallback((id: number) => {
    const deleteData = (data: ITableBody[]): ITableBody[] => {
      return data.filter((row) => {
        if (row.id === id) {
          return false
        }

        if (row.child) {
          row.child = deleteData(row.child)
        }

        return true
      })
    }

    setTableData((prevData) => deleteData(prevData))
  }, [])

  const deleteRow = useCallback(
    async (id: number) => {
      if (editingRowId) return

      try {
        await removeRow(id)
        deleteLocalRow(id)
      } catch (error) {
        console.error('Failed to delete row:', error)
      }
    },
    [editingRowId, deleteLocalRow]
  )

  const startEditing = useCallback((row: ITableBody) => {
    setEditingRowId(row.id)
    setEditingData({ ...row })
  }, [])

  const changeEditingData = useCallback(
    (field: keyof ITableBody, value: string | number) => {
      if (editingData) {
        setEditingData({
          ...editingData,
          [field]: value,
        })
      }
    },
    [editingData]
  )

  const saveEditingData = useCallback(async () => {
    if (editingRowId !== null && editingData) {
      const {
        parentId,
        equipmentCosts,
        estimatedProfit,
        overheads,
        rowName,
        salary,
        isNew,
        id,
      } = editingData

      let newRowData

      try {
        if (isNew) {
          newRowData = await sendNewRow(
            parentId,
            equipmentCosts,
            estimatedProfit,
            overheads,
            rowName,
            salary
          )
        }

        if (!isNew) {
          newRowData = await updateRow(
            id,
            equipmentCosts,
            estimatedProfit,
            overheads,
            rowName,
            salary
          )
        }

        if (newRowData) {
          updateLocalRow(editingRowId, {
            ...editingData,
            id: newRowData.id,
            isNew: false,
          })
        }

        setEditingRowId(null)
        setEditingData(null)
      } catch (error) {
        console.error('Failed to save editing data:', error)
      }
    }
  }, [editingRowId, editingData, updateLocalRow])

  useEffect(() => {
    setTableData(initialData)
  }, [initialData])

  return {
    tableData,
    createRow,
    deleteRow,
    editingRowId,
    editingData,
    startEditing,
    changeEditingData,
    saveEditingData,
  }
}
