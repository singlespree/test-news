import { AUTH_ID, BASE_URL } from './constants'

async function getData() {
  try {
    const response = await fetch(
      `${BASE_URL}/v1/outlay-rows/entity/${AUTH_ID}/row/list`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )

    if (!response.ok) {
      console.error('Error fetching data:', response)
      return []
    }

    const data = await response.json()

    if (!data || data?.error) {
      console.error('Data error:', data?.error)
      return []
    }

    return data
  } catch (error) {
    console.error('Fetch error:', error)
    return []
  }
}

export default getData
