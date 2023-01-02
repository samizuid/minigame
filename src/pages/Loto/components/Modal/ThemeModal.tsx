import {FC, useEffect} from 'react'
import { Popup } from '../../../../components'
import cls from 'classnames'
import styles from './styles.module.scss'

interface IProps {
    theme: string
    isShow: boolean
    setIsShow: (isShow: boolean) => void
    setTheme: (theme: string) => void
}

enum COLOR_TYPES {
  COLOR_1 = '#8fbcbb',
  COLOR_2 = '#5e81ac',
  COLOR_3 = '#bf616a',
  COLOR_4 = '#d08770',
  COLOR_5 = '#ebcb8b',
  COLOR_6 = '#b48ead'
}

const colorValues = Object.values(COLOR_TYPES)

const ThemeModal:FC<IProps> = ({isShow, theme, setIsShow, setTheme}) => {

    useEffect(() => {
      const backgrounds = document.querySelectorAll(`.${styles.color}`) as any
      const backgroundArray = Array.from(backgrounds)

      backgroundArray.map((item: any, index: number) => {
        item.style.backgroundColor = colorValues[index]
      })
    }, [])

    return (
        <Popup
            title='Chọn màu lô tô'
            isOpen={isShow}
            onClose={() => setIsShow(false)}
        >
            <div className={styles.popupThemeCustom}>
              {colorValues.map((color) => {
                return (
                  <div
                    data-bg={color}
                    key={color}
                    className={cls(
                      styles.color,
                      {[styles.selected]: theme === color},
                    )}
                    onClick={() => setTheme(color)}
                  >
                  </div>
                )
              })}
          </div>
        </Popup>
    )
}

export default ThemeModal
