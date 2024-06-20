import { ITableBody } from '@/ts/table'

export const addNewChild = (
  items: ITableBody[],
  parentId?: number
): { updatedItems: ITableBody[]; newRow: ITableBody | null } => {
  let newRow: ITableBody | null = null

  const updatedItems = items.map((item) => {
    if (item.id === parentId) {
      const newChild = {
        id: Date.now(),
        rowName: '',
        total: 0,
        salary: 0,
        mimExploitation: 0,
        machineOperatorSalary: 0,
        materials: 0,
        mainCosts: 0,
        supportCosts: 0,
        equipmentCosts: 0,
        overheads: 0,
        estimatedProfit: 0,
        parentId: parentId,
        child: [],
        isNew: true,
      }

      newRow = newChild

      return {
        ...item,
        child: [...item.child, newChild],
      }
    }

    if (item.child.length > 0) {
      const result = addNewChild(item.child, parentId)

      if (result.newRow) {
        newRow = result.newRow
      }

      return {
        ...item,
        child: result.updatedItems,
      }
    }

    return item
  })

  return { updatedItems, newRow }
}
