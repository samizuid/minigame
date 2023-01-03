import React, {useEffect} from 'react'
import cls from 'classnames'

import styles from './Ticket.module.scss'

export const Ticket: React.FunctionComponent<{
  isCaller?: boolean
  numbers: number[][]
  numbersSelected: number[]
  theme: string
  onSelect: (number: number) => void
}> = ({ isCaller, numbers, numbersSelected, theme, onSelect }) => {

  useEffect(() => {
    setTimeout(() => {
      const backgroundAll = document.querySelectorAll(`.${styles.number}`)
      const backgroundAllArray = Array.from(backgroundAll)
  
      backgroundAllArray.forEach((item: any) => {
        item.style.backgroundColor = '#eeeeee'

        const isItemEmpty = item.classList.contains(styles.empty)
        if (isItemEmpty) {
          item.style.backgroundColor = theme
        }
      })
    }, 0)
  }, [theme, numbers])

  return (
    <div
      className={cls({
        [styles.ticket]: true,
        [styles.haveCaller]: isCaller,
      })}
    >
      {numbers.map((row: number[], rowIndex: number) => (
        <div
          key={rowIndex}
          className={cls({
            [styles.row]: true,
          })}
        >
          {row.map((number, numberIndex) => (
            <div
              key={numberIndex}
              className={cls({
                [styles.number]: true,
                [styles.empty]: !number,
                [styles.selected]: numbersSelected.includes(number),
              })}
              onClick={() => !!number && onSelect(number)}
            >
              <span className={styles.text}>{number ? number : ' '}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
