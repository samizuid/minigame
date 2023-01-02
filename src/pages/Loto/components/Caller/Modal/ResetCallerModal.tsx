import {FC} from 'react'
import { Popup } from '../../../../../components'

interface IProps {
    isShow: boolean
    setIsShow: (isShow: boolean) => void
    setIsResetCaller: (isResetCaller: boolean) => void
}

const ResetCallerModal:FC<IProps> = ({isShow, setIsShow, setIsResetCaller}) => {
    const onConfirm = () => {
        setIsResetCaller(true)
        setIsShow(false)

    }

    return (
        <Popup
            title='Xóa tất cả và chơi lại?'
            isOpen={isShow}
            onClose={() => setIsShow(false)}
            onConfirm={onConfirm}
            isShowFooter={true}
        >
        </Popup>
    )
}

export default ResetCallerModal
