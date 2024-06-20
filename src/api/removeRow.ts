import { AUTH_ID, BASE_URL } from './constants'

async function removeRow(rowId: number) {
  try {
    const response = await fetch(
      `${BASE_URL}/v1/outlay-rows/entity/${AUTH_ID}/row/${rowId}/delete`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!response.ok) {
      console.error(`Failed to delete row:`, response)
      return
    }
  } catch (error) {
    console.error('Error deleting row:', error)
  }
}

export default removeRow
