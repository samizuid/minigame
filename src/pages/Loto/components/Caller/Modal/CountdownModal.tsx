import {FC} from 'react'
import cls from 'classnames'
import { Popup } from '../../../../../components'

import styles from './styles.module.scss'

interface IProps {
    countdown: string
    isShowCountdown: boolean
    setCountdown: (countdown: string) => void
    setIsShowCountdown: (isShowCountdown: boolean) => void
}

const CountdownModal:FC<IProps> = ({countdown, isShowCountdown, setCountdown, setIsShowCountdown}) => {
    const countdownValues = ['3', '4', '5']

    return (
        <Popup
            title='Thời gian chờ gọi số'
            isOpen={isShowCountdown}
            onClose={() => setIsShowCountdown(false)}
            isShowFooter={false}
        >
            <div className={styles.popupCountdownCustom}>
                {countdownValues.map(item => {
                    return (
                        <div
                            key={item}
                            className={cls(styles.countdownTime, {[styles.selected]: countdown === item})}
                            onClick={() => setCountdown(item)}
                            >
                                {item}s
                        </div>
                    )
                })}
            </div>
        </Popup>
    )
}

export default CountdownModal
