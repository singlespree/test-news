import { AUTH_ID, BASE_URL } from './constants'

async function updateRow(
  rowId?: number,
  equipmentCosts?: number,
  estimatedProfit?: number,
  overheads?: number,
  rowName?: string,
  salary?: number
) {
  try {
    const response = await fetch(
      `${BASE_URL}/v1/outlay-rows/entity/${AUTH_ID}/row/${rowId}/update`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipmentCosts: equipmentCosts || 0,
          estimatedProfit: estimatedProfit || 0,
          overheads: overheads || 0,
          rowName: rowName || '',
          salary: salary || 0,
          id: rowId,
          machineOperatorSalary: 0,
          mainCosts: 0,
          materials: 0,
          mimExploitation: 0,
          total: 0,
          supportCosts: 0,
        }),
      }
    )

    if (!response.ok) {
      console.error(`Failed to update row:`, response)
      return
    }

    const data = await response.json()

    if (data.current) {
      return data.current
    }
  } catch (error) {
    console.error('Error updating row:', error)
  }
}

export default updateRow
