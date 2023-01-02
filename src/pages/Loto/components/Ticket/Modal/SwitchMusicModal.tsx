import {FC} from 'react'
import { Popup } from '../../../../../components'

interface IProps {
    isShow: boolean
    isPlayMusicBingo: boolean
    setIsShow: (isShow: boolean) => void
    setIsPlayMusicBingo: (isPlayMusicBingo: boolean) => void
}

const SwitchMusicModal:FC<IProps> = ({isShow, isPlayMusicBingo, setIsShow, setIsPlayMusicBingo}) => {
    const title = isPlayMusicBingo ? 'Tắt nhạc khi KINH lô tô?' : 'Bật nhạc khi KINH lô tô?'

    const onConfirm = () => {
        setIsPlayMusicBingo(!isPlayMusicBingo)
        setIsShow(false)
    }

    return (
        <Popup
            title={title}
            isOpen={isShow}
            onClose={() => setIsShow(false)}
            onConfirm={onConfirm}
            isShowFooter
            isPlayer
        >
        </Popup>
    )
}

export default SwitchMusicModal
