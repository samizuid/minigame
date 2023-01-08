import {FC} from 'react'
import { Popup } from '../../../../components'
import cls from 'classnames'
import { ROLE_TYPES } from '../../Loto'

import styles from './styles.module.scss'

interface IProps {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
    handleSelectRole: (role: ROLE_TYPES.CALLER | ROLE_TYPES.PLAYER) => void
}

const RoleTypeModal:FC<IProps> = ({isShow, setIsShow, handleSelectRole}) => {
    return (
        <Popup
            title='Chọn chế độ chơi'
            isOpen={isShow}
            onClose={() => setIsShow(false)}
            isShowFooter={false}
        >
            <div className={styles.popupRoleCustom}>
            <button
              type='button'
              className={cls(styles.button, styles.playerButton)}
              onClick={() => handleSelectRole(ROLE_TYPES.PLAYER)}
            >
              Người chơi lô tô
            </button>
            <button
              type='button'
              className={cls(styles.button, styles.callerButton)}
              onClick={() => handleSelectRole(ROLE_TYPES.CALLER)}
            >
              Người gọi số
            </button>
            {/* <div className={styles.traffic}>
              Lượt truy cập: <span className={styles.trafficNumber}>{'chưa cập nhật'}</span>
            </div> */}
          </div>
        </Popup>
    )
}

export default RoleTypeModal
