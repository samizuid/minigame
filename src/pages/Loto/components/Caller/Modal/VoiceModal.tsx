import {FC} from 'react'
import cls from 'classnames'
import { Popup } from '../../../../../components'

import styles from './styles.module.scss'

interface IProps {
    voice: string
    isShowVoice: boolean
    setVoice: (voice: string) => void
    setIsShowVoice: (isShowVoice: boolean) => void
}

const VoiceModal:FC<IProps> = ({voice, isShowVoice, setVoice, setIsShowVoice}) => {
    const voiceValues = [
        { key: 'gay', value: 'Bê Đê' },
        { key: 'male-south', value: 'Trai Miền Nam' },
        { key: 'male-north', value: 'Trai Miền Bắc' },
        // { key: 'male-middle', value: 'Trai Miền Trung' },
        { key: 'female-south', value: 'Nữ Miền Nam' },
        { key: 'female-north', value: 'Nữ Miền Bắc' },
        // { key: 'female-middle', value: 'Nữ Miền Trung' },
    ]

    return (
        <Popup
            title='Chọn giọng gọi lô tô'
            isOpen={isShowVoice}
            onClose={() => setIsShowVoice(false)}
            isShowFooter={false}
        >
            <div className={styles.popupVoiceCustom}>
                {voiceValues.map(item => {
                    return (
                        <div
                            key={item.key}
                            className={cls(styles.voice, {[styles.selected]: voice === item.key})}
                            onClick={() => setVoice(item.key)}
                            >
                                {item.value}
                        </div>
                    )
                })}
            </div>
        </Popup>
    )
}

export default VoiceModal
