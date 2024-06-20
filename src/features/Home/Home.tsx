'use client'

import styles from './Home.module.scss'
import React, { useEffect, useState } from 'react'
import WorkType from '@/features/Home/WorkType'
import Table from '@/components/Widgets/Table/Table'
import getData from '@/api/getData'
import sendNewRow from '@/api/sendNewRow'

export default function HomePage() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let result = await getData()
      setData(result)

      if (result.length === 0) {
        await sendNewRow()
        result = await getData()
        setData(result)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={styles.container}>
      <WorkType work="Строительно-монтажные работы" />
      <Table data={data} />
    </div>
  )
}
