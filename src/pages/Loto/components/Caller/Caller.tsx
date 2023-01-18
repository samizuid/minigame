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
const CALL_VOICE = 'male-south'

export const Caller: React.FunctionComponent<{
  isShowRolePopup: boolean
  isShowReloadPopup: boolean
  isStartedCall: boolean
  isResetCaller: boolean
  setIsStartedCall:  (isStartedCall: boolean) => void
  setIsResetCaller: (isBoolean: boolean) => void
  setIsShowReloadPopup: (isShow: boolean) => void
}> = ({ isResetCaller, isStartedCall, isShowReloadPopup, setIsResetCaller, setIsStartedCall, setIsShowReloadPopup }) => {
  const playingVoice: any = useRef(new Audio(``))
  const [calledNumbers, setCalledNumbers] = useState<number[]>([])
  const [isShowCountdown, setIsShowCountdown] = useState<boolean>(false)
  const [voice, setVoice] = useState(CALL_VOICE)
  const [isShowVoice, setIsShowVoice] = useState<boolean>(false)
  const [countdown, setCountdown] = useState(CALL_COUNT_DOWN)
  const { timer, startTimer, stopTimer } = useCountDown({})
  const numberCurrent = calledNumbers.at(-1)
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
    // if (!numberCurrent) return

    const audioInit = []
    for (let i = 1; i <= 90; ++i) {
      const au = new Audio(`/voices/${voice}/${i}.mp3`)
      au.load()
      audioInit.push(au)
    }
    setAudios(audioInit)

    // playingVoice.current = new Audio(`/voices/${voice}/${numberCurrent}.mp3`);
    // playingVoice.current.load()

    return () => {
      playingVoice.current?.pause()
      playingVoice.current = null
    }
  }, [voice])


  useEffect(() => {
    // if (!playingVoice.current) return
    if (!numberCurrent) return


    if (isStartedCall) {
      // const element = document.getElementById('caller-id') as HTMLElement
      // const event2 = new TouchEvent("touchstart");
      // element.dispatchEvent(event2);

      const event = document.createEvent('HTMLEvents')
      event.initEvent('touchstart', true, false)

      playingVoice.current = audios[numberCurrent - 1]
      console.log('%c>>> log audios', 'color:green', audios)
      playingVoice.current.play()
    } else {
      playingVoice.current.pause()
      playingVoice.current = null
    }
  }, [numberCurrent, isStartedCall, calledNumbers])

  // Handle countdown
  useEffect(() => {
    if (!isStartedCall) return

    if (timer === 0) {
      startTimer(+countdown)
    }

    if (timer === +countdown) {
      handleCallNewNumber()
    }
  }, [isStartedCall, countdown, timer])

  useEffect(() => {
    if (!isResetCaller) return

    setCalledNumbers([])
    setIsResetCaller(false)

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
      setCalledNumbers([...calledNumbers, randomNumber])
    }
  }

  return (
    <div id='caller-id' className={styles.caller}>
      <div className={styles.callerHeader}>
        <div className={styles.callingPastTime}>{pastTimes.join(' - ')}</div>
        <div className={styles.callingTime}>{calledNumbers.length ? numberCurrent : '?' }</div>
        <div className={styles.setting}>
          {/* <button
            id='play-audio'
            type='button'
            className={styles.button}
            onClick={handleClick}
          >
            <FiXCircle />
          </button> */}
          <button id="play-button">Play1</button>

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
