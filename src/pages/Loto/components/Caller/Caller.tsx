import { useEffect, useState, useRef } from 'react'
import { ImMusic, BiTime, FiXCircle} from 'react-icons/all'
import cls from 'classnames'

import VoiceModal from './Modal/VoiceModal';
import CountdownModal from './Modal/CountdownModal';
import { generateCallerNumbers, randomIntFromInterval } from '../../../../utils'
import { useCountDown, useClickOutSide } from '../../../../hooks'

import popupStyles from '../../../../components/Popup/Popup.module.scss'
import styles from './Caller.module.scss'

const CALL_COUNT_DOWN = '5'
const CALL_VOICE = 'gay'

export const Caller: React.FunctionComponent<{
  isPhone: boolean
  isShowRolePopup: boolean
  isShowReloadPopup: boolean
  isStartedCall: boolean
  isResetCaller: boolean
  setIsStartedCall:  (isStartedCall: boolean) => void
  setIsResetCaller: (isBoolean: boolean) => void
  setIsShowReloadPopup: (isShow: boolean) => void
}> = ({ isPhone, isResetCaller, isStartedCall, isShowReloadPopup, setIsResetCaller, setIsStartedCall, setIsShowReloadPopup }) => {
  const playingVoice: any = useRef(new Audio(``))
  const [calledNumbers, setCalledNumbers] = useState<number[]>([])
  const [isShowCountdown, setIsShowCountdown] = useState<boolean>(false)
  const [voice, setVoice] = useState(CALL_VOICE)
  const [isShowVoice, setIsShowVoice] = useState<boolean>(false)
  const [countdown, setCountdown] = useState(CALL_COUNT_DOWN)
  const { timer, startTimer, stopTimer, setIsStart } = useCountDown()
  const [numberCurrent, setNumberCurrent] = useState<number>()
  const [numberCurrentWaiting, setNumberCurrentWaiting] = useState<any>('?')
  const pastTimes =  calledNumbers.slice(0, calledNumbers.length-1).slice(-4)
  const [audios, setAudios] = useState<any>([])

  useClickOutSide({wrapperClass: popupStyles.popupContainer,  callback: () =>  {
    setIsShowVoice(false)
    setIsShowCountdown(false)
    setIsShowReloadPopup(false)
  }})

  useEffect(() => {
    document.addEventListener("touchstart", function(){
      playingVoice.current.play();
    }, false);
  }, [])

  // Handle voice
  useEffect(() => {
    if([isShowReloadPopup, isShowVoice, isShowCountdown].some(Boolean)) {
      setIsStartedCall(false)
    }
  }, [isShowReloadPopup, isShowVoice, isShowCountdown])

  useEffect(() => {
    const audioInit = []

    for (let i = 1; i <= 90; ++i) {
      const audio = new Audio(`/voices/${voice}/${i}.mp3`)
      audioInit.push(audio)
    }

    setAudios(audioInit)
  }, [voice])

  useEffect(() => {
    if (!numberCurrent) return

    playingVoice.current = audios[numberCurrent - 1]
    playingVoice.current.load()

    return () => {
      playingVoice.current?.pause()
      playingVoice.current = null
    }
  }, [numberCurrent])

  useEffect(() => {
    if (!playingVoice.current) return

    if (isStartedCall) {
      // trick for IOS
      const event = document.createEvent('HTMLEvents')
      event.initEvent('touchstart', true, false)

      playingVoice.current.play()
    } else {
      playingVoice.current.pause()
      playingVoice.current = null
    }
  }, [numberCurrent, isStartedCall])

  useEffect(() => {
    if (numberCurrentWaiting === '?') return

    setCalledNumbers([...calledNumbers, numberCurrentWaiting])
  }, [numberCurrentWaiting])

  // Handle countdown
  useEffect(() => {
    startTimer(+countdown)
  }, [countdown])

  useEffect(() => {
    setIsStart(isStartedCall)
    if (!isStartedCall) return

    const needToCall = isPhone ? 1 : 0

    if (timer === 0) {
      startTimer(+countdown)
    }

    if (timer === needToCall) {
      handleCallNewNumber()
    }
  }, [isStartedCall, timer])

  useEffect(() => {
    if (!isResetCaller) return

    setCalledNumbers([])
    setIsResetCaller(false)
    setNumberCurrentWaiting('?')
    startTimer(+countdown)

  }, [isResetCaller])

  const handleCallNewNumber = () => {
    const randomNumber = randomIntFromInterval(1, 90)

    if (calledNumbers.includes(randomNumber)) {
      if (calledNumbers.length < 90) {
        handleCallNewNumber()
      } else {
        stopTimer()
      }
    } else {
      setNumberCurrent(randomNumber)
      setTimeout(() => {
        setNumberCurrentWaiting(randomNumber)
      }, isPhone ? 1000 : 0)
    }
  }

  return (
    <div className={styles.caller}>
      <div className={styles.callerHeader}>
        <div className={styles.callingPastTime}>{pastTimes.join(' - ')}</div>
        <div className={styles.callingTime}>{numberCurrentWaiting}</div>
        <div className={styles.setting}>
          <div className={styles.timerWrapper}>
            <div className={styles.timer}>
              {timer}s
            </div>
          </div>
          <button
            type='button'
            className={styles.button}
            onClick={() => setIsShowCountdown(true)}
          >
            <BiTime />
          </button>
          <button
            type='button'
            className={styles.button}
            onClick={() => {
              setIsShowVoice(true)
            }}
          >
            <ImMusic />
          </button>
        </div>
      </div>
      <div className={styles.callerNumbers}>
        {generateCallerNumbers().map((item: number) => {
          return (
            <div
              className={cls(styles.callerItem, {[styles.selected]: calledNumbers.includes(item)})} 
              key={item}
              >
                {item}
            </div>
            )
        })}
      </div>
      {isShowCountdown && <CountdownModal
        countdown={countdown}
        isShowCountdown={isShowCountdown}
        setCountdown={setCountdown}
        setIsShowCountdown={setIsShowCountdown}
      />
      }
      {isShowVoice && <VoiceModal
        voice={voice}
        isShowVoice={isShowVoice}
        setVoice={setVoice}
        setIsShowVoice={setIsShowVoice}
      />
      }
    </div>
  )
}
