import {FC, useState, useEffect} from 'react'
import { Popup } from '../../../../components'
import cls from 'classnames'
import { ReactComponent as LoadingIcon } from '../../../../assets/loading.svg'

import styles from './styles.module.scss'

interface IProps {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
}

const IntroductionModal:FC<IProps> = ({isShow, setIsShow}) => {
    const [isShowImage, setIsShowImage] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setIsShowImage(true)
        }, 500)
    }, [])

    return (
        <Popup
            title='Hướng dẫn'
            isOpen={isShow}
            onClose={() => setIsShow(false)}
            isShowFooter={false}
        >
            <div className={styles.popupIntroductionCustom}>
                <div className={cls(styles.hidden, {[styles.display]: isShowImage})}>
                    <LoadingIcon />
                </div>
            </div>

            <div className={styles.popupIntroductionCustom}>
                <div className={cls(styles.hidden, {[styles.display]: !isShowImage})}>
                    <img src='/images/introduction/1.png' />
                    <span>----------------------</span>
                    <div>1. Chế độ người chơi</div>
                    <img src='/images/introduction/2.png' />
                    <span>----------------------</span>
                    <img src='/images/introduction/3.png' />
                    <span>----------------------</span>
                    <div>2. Chế độ người gọi số</div>
                    <img src='/images/introduction/4.png' />
                    <span>----------------------</span>
                    <img src='/images/introduction/5.png' />
              </div>
          </div>
        </Popup>
    )
}

export default IntroductionModal
