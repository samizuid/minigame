import { useEffect, useState, useRef } from 'react'

export const useCountDown = (): {
  timer: number
  startTimer: (time: number) => void
  stopTimer: () => void
  setIsStart: (isStart: boolean) => void
} => {
  const [isStart, setIsStart] = useState(false)
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef<any>()

  const stopTimer = () => {
    intervalRef.current && clearInterval(intervalRef.current)
  }

  const startTimer = (time: number) => {
    setTimer(time)
  }

  useEffect(() => {
    if (!isStart) return

    if (timer <= 0) return stopTimer()

    intervalRef.current = setInterval(() => {
      setTimer((t) => t - 1)
    }, 1000)

    return () => {
      intervalRef.current && clearInterval(intervalRef.current)
    }
  }, [timer, isStart])

  return { timer, startTimer, stopTimer, setIsStart }
}
