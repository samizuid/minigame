import {FC} from 'react'
import { Popup } from '../../../../../components'

import styles from './styles.module.scss'

interface IProps {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
    setIsResetPlayer: (isReset?: boolean) => void
}

const ResetPlayerModal:FC<IProps> = ({isShow, setIsShow, setIsResetPlayer}) => {
    const onConfirm = () => {
        setIsResetPlayer(true)
        setIsShow(false)

    }

    return (
        <Popup
            title='Tạo mới tờ lô tô khác?'
            isOpen={isShow}
            onClose={() => setIsShow(false)}
            onConfirm={onConfirm}
        >
            <div className={styles.popupResetCustom}>
                <button
                    type='button'
                    className={styles.button}
                    onClick={() => setIsResetPlayer(false)}
                >
                    Giữ và Làm mới
                </button>
                <button
                    type='button'
                    className={styles.button}
                    onClick={() => setIsResetPlayer()}
                >
                    Tạo mới
                </button>
            </div>
        </Popup>
    )
}

export default ResetPlayerModal
