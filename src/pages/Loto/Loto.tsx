import { useEffect, useState, useRef } from 'react'
import cls from 'classnames'
import { BsPlayFill, BsPauseFill, CgColorPicker, ImMusic, TbMusicOff } from 'react-icons/all'

import { ReactComponent as ReloadIcon } from '../../assets/reload-icon.svg'

import { useClickOutSide } from '../../hooks'
import { generateLotoTicket, randomEnum, randomIntFromInterval } from '../../utils'
import { Ticket, Caller } from './components'

import styles from './Loto.module.scss'
import popupStyles from '../../components/Popup/Popup.module.scss'

import ResetCallerModal from './components/Caller/Modal/ResetCallerModal';
import ResetPlayerModal from './components/Ticket/Modal/ResetPlayerModal';
import SwitchMusicModal from './components/Ticket/Modal/SwitchMusicModal';
import RoleTypeModal from './components/Modal/RoleTypeModal';
import ThemeModal from './components/Modal/ThemeModal';

export enum ROLE_TYPES {
  PLAYER = 'PLAYER',
  CALLER = 'CALLER',
}

export enum COLOR_TYPES {
  COLOR_1 = '#8fbcbb',
  COLOR_2 = '#5e81ac',
  COLOR_3 = '#bf616a',
  COLOR_4 = '#d08770',
  COLOR_5 = '#ebcb8b',
  COLOR_6 = '#b48ead'
}

const isMatchAndroid = navigator.userAgent.match(/Android/i)
const isMatchIphone = navigator.userAgent.match(/iPhone/i)

export const Loto = () => {
  // Common
  const [isShowRolePopup, setIsShowRolePopup] = useState(true)
  const [roleType, setRoleType] = useState('')
  const isCaller = roleType === ROLE_TYPES.CALLER
  const getLinkFacebook = () => {
    if (isMatchAndroid) return 'fb://page/100002318448258'
    if (isMatchIphone) return 'fb://profile/100002318448258'

    return 'https://www.facebook.com/Zino.io'
  }

  // Player
  const playingMusicBingo: any = useRef(null)
  const [isPlayMusicBingo, setIsPlayMusicBingo] = useState<boolean>(true)
  const [isShowConfirmPlayMusic, setIsShowConfirmPlayMusic] = useState<boolean>(false)
  const [theme, setTheme] = useState<string>(randomEnum(COLOR_TYPES) as COLOR_TYPES)
  const [isShowBingo, setIsShowBingo] = useState<boolean>(false)
  const [numbersSelected, setNumbersSelected] = useState<number[]>([])
  const [lotoTicketFinal, setLotoTicketFinal] = useState<number[][]>([])
  const [isShowReloadPopup, setIsShowReloadPopup] = useState(false)
  const [isShowTheme, setIsShowTheme] = useState(false)

  // Caller
  const [isStartedCall, setIsStartedCall] = useState(false)
  const [isResetCaller, setIsResetCaller] = useState(false)

  useClickOutSide({wrapperClass: popupStyles.popupContainer, callback: () => {
    setIsShowTheme(false)
    setIsShowReloadPopup(false)
  }})

  useEffect(() => {
    handleReGenerateLotoTicket()
  }, [])

  useEffect(() => {
    if (isShowBingo && isPlayMusicBingo) {
      // const randomNumber = randomIntFromInterval(1, 10)

      // playingMusicBingo.current = new Audio(`/bingo/${randomNumber}.mp3`);
      // playingMusicBingo.current.play()
    } else {
      playingMusicBingo.current?.pause()
      playingMusicBingo.current = null
    }
  }, [isShowBingo])

  const handleSelectNumber = (number: number) => {
    const isExisting = numbersSelected.includes(number)
    let result = [...numbersSelected]

    if (isExisting) {
      result = numbersSelected.filter(
        (numberExisting) => numberExisting !== number,
      )
    } else {
      result = [...numbersSelected, number]
    }

    const isCheckBingo = lotoTicketFinal
      .map((row) =>
        row
          .filter((number) => !!number)
          .map((number) => result.includes(number)),
      )
      .some((row) => row.every(Boolean))

    console.log('%c>>> log biisfd', 'color:green', isCheckBingo)

    if (isCheckBingo && isPlayMusicBingo) {
      const randomNumber = randomIntFromInterval(1, 10)

      playingMusicBingo.current = new Audio(`/bingo/${randomNumber}.mp3`);
      playingMusicBingo.current.play()
    }

    setIsShowBingo(isCheckBingo)
    setNumbersSelected(result)
  }

  const handleReGenerateLotoTicket = (isCreateNew: boolean = true) => {
    const newTicket = generateLotoTicket({ rows: 9, columns: 9 })

    if (isCreateNew) {
      setLotoTicketFinal(newTicket)
    }

    setNumbersSelected([])
    setIsShowReloadPopup(false)
    setIsShowBingo(false)
    setIsResetCaller(isCaller)
  }

  const handleSelectRole = (roleType: string) => {
    setRoleType(roleType)
    setIsShowRolePopup(false)
  }

  const handleTurnOffBingo = () => {
    if (isShowBingo) {
      setIsShowBingo(false)
    }
  }

  return (
    <>
      <div className={styles.wrapperHeader} onClick={handleTurnOffBingo}>
        {isShowBingo && <img className={styles.wonBg} src={`/images/won/bg.png`} />}
        <header className={styles.header}>
          <div className={styles.logoWrapper} onClick={() => {
            setIsShowRolePopup(true)
            setIsStartedCall(false)
          }}>
            <img src='/images/lucky.jpeg' className={styles.logo} alt='logo' />
          </div>

          {isCaller && <button
            type='button'
            className={cls(styles.button)}
          >
            {isStartedCall ?
              <BsPlayFill onClick={() => setIsStartedCall(false)} /> :
              <BsPauseFill onClick={() => setIsStartedCall(true)}  />
            }
            </button>}

          <div className={styles.settingWrapper}>
            {!isCaller && (
              <>
                <button
                  type='button'
                  className={cls(styles.button, styles.colorPlayer)}
                  onClick={() => setIsShowConfirmPlayMusic(true)}
                >
                  {isPlayMusicBingo ? <ImMusic /> : <TbMusicOff className={styles.musicOffIcon}/>}
                </button>
                <button
                  type='button'
                  className={cls(styles.button, styles.colorPlayer)}
                  onClick={() => setIsShowTheme(true)}
                >
                  <CgColorPicker />
                </button>
              </>)
            }
            <button
              type='button'
              className={cls(styles.button, styles.rotate, {[styles.colorPlayer]: !isCaller})}
              onClick={() => setIsShowReloadPopup(true)}
            >
              <ReloadIcon />
            </button>
          </div>
        </header>

        <div className={cls(styles.body, {[styles.player]: !isCaller })}>
          <Ticket
            isCaller={isCaller}
            numbers={lotoTicketFinal}
            numbersSelected={numbersSelected}
            theme={theme}
            onSelect={handleSelectNumber}
          />

          {isCaller && (
            <Caller
              isShowRolePopup={isShowRolePopup}
              isShowReloadPopup={isShowReloadPopup}
              isStartedCall={isStartedCall}
              setIsStartedCall={setIsStartedCall}
              isResetCaller={isResetCaller}
              setIsResetCaller={setIsResetCaller}
              setIsShowReloadPopup={setIsShowReloadPopup}
            />
          )}
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.banner} />
        <div className={styles.madeBy}>Made by <a href={getLinkFacebook()}>QuanDuy</a></div>

        <div className={styles.qrCode}>
          <img src='/images/qr-code.png' />
        </div>
      </footer>

      {isShowRolePopup && (
        <RoleTypeModal
          isShow={isShowRolePopup}
          setIsShow={setIsShowRolePopup}
          handleSelectRole={handleSelectRole}
        />)
      }

      {isShowConfirmPlayMusic && !isCaller && (
        <SwitchMusicModal
          isShow={isShowConfirmPlayMusic}
          isPlayMusicBingo={isPlayMusicBingo}
          setIsShow={setIsShowConfirmPlayMusic}
          setIsPlayMusicBingo={setIsPlayMusicBingo}
        />
      )}

      {isShowReloadPopup && isCaller && (
        <ResetCallerModal
          setIsResetCaller={setIsResetCaller}
          isShow={isShowReloadPopup}
          setIsShow={setIsShowReloadPopup}/>
      )}

      {isShowReloadPopup && !isCaller && (
        <ResetPlayerModal
          setIsResetPlayer={handleReGenerateLotoTicket}
          isShow={isShowReloadPopup}
          setIsShow={setIsShowReloadPopup}
        />
      )}

      {isShowTheme && !isCaller && (
        <ThemeModal
          theme={theme}
          isShow={isShowTheme}
          setTheme={setTheme}
          setIsShow={setIsShowTheme}/>
      )}
    </>
  )
}
