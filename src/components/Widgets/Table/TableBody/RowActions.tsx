'use client'

import React, { FC } from 'react'
import FileSvg from '../../../../../public/icons/file.svg'
import TrashSvg from '../../../../../public/icons/trash.svg'
import styles from './TableBody.module.scss'

interface RowActionsProps {
  id: number
  level: number
  onCreateRow: (id: number) => void
  onDeleteRow: (id: number) => void
}

const RowActions: FC<RowActionsProps> = ({
  id,
  level,
  onCreateRow,
  onDeleteRow,
}) => {
  return (
    <td className={styles.level}>
      <div
        className={styles.iconContainer}
        style={{ marginLeft: `${level * 1.25}rem` }}
      >
        <FileSvg className={styles.fileSvg} onClick={() => onCreateRow(id)} />
        <TrashSvg className={styles.trashSvg} onClick={() => onDeleteRow(id)} />
      </div>
    </td>
  )
}

export default RowActions
