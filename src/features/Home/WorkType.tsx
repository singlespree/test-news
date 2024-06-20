'use client'

import styles from './WorkType.module.scss'
import React, { FC } from 'react'

interface IWorkType {
  work: string
}

const WorkType: FC<IWorkType> = ({ work }) => {
  return (
    <div className={styles.workType}>
      <div className={styles.workItem}>{work}</div>
    </div>
  )
}

export default WorkType
