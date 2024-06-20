import { AUTH_ID, BASE_URL } from './constants'

async function deleteRow(rowId: number) {
  try {
    await fetch(
      `${BASE_URL}/v1/outlay-rows/entity/${AUTH_ID}/row/${rowId}/delete`,
      {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.log(error)
  }
}

export default deleteRow
