import {FC} from 'react'
import { Popup } from '../../../../../components'

import styles from './styles.module.scss'

interface IProps {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
}

const NotSupportIOSModal:FC<IProps> = ({isShow, setIsShow}) => {
    return (
        <Popup
            title='Chú ý'
            isOpen={isShow}
            onClose={() => setIsShow(false)}
        >
            <div className={styles.popupSupportCustom}>
                <div>Audio Gọi Số chỉ đang hỗ trợ cho</div> 
                <div>điện thoại Android, Laptop, Desktop !</div>
            </div>
        </Popup>
    )
}

export default NotSupportIOSModal
