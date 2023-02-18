import cls from 'classnames'
import { ReactComponent as CloseIcon } from '../../assets/close-icon.svg'

import styles from './Popup.module.scss'

export const Popup: React.FunctionComponent<{
  isOpen: boolean
  children: any
  isShowFooter?: boolean
  title?: string
  isPlayer?: boolean
  onClose: () => void
  onConfirm?: () => void
}> = ({
  isOpen,
  children,
  title = 'Notification',
  isShowFooter = false,
  isPlayer = false,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className={styles.popup}>
      <div className={styles.overplay} />
      <div className={styles.popupContainer}>
        <div className={styles.popupWrapper}>
          <div className={styles.popupHeader}>
            <h3 className={styles.popupTitle}>{title}</h3>

            <button
              type='button'
              className={styles.popupClose}
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          {children && <div className={styles.popupBody}>{children}</div>} 

          {isShowFooter && (
            <div className={styles.popupFooter}>
              <button
                type='button'
                className={cls(styles.button, styles.cancelButton)}
                onClick={onClose}
              >
                Không
              </button>
              <button
                type='button'
                className={cls(styles.button, styles.okButton, {[styles['okButton--player']]: isPlayer})}
                onClick={onConfirm}
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
