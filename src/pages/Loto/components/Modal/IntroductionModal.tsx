import {FC} from 'react'
import { Popup } from '../../../../components'
import cls from 'classnames'
import { ROLE_TYPES } from '../../Loto'

import styles from './styles.module.scss'

interface IProps {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
}

const IntroductionModal:FC<IProps> = ({isShow, setIsShow}) => {
    return (
        <Popup
            title='Hướng dẫn'
            isOpen={isShow}
            onClose={() => setIsShow(false)}
            isShowFooter={false}
        >
            <div className={styles.popupIntroductionCustom}>
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
        </Popup>
    )
}

export default IntroductionModal
