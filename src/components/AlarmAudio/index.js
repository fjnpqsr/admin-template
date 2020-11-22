import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import alarmMusic from '../../assets/alarm.wav'

const AlarmAudio = (props, ref) => {
  const inputRef = useRef(null)
  const alarm = () => {
    if (!inputRef.current) {
      console.log('something wrong with audio player, please check')
      return false
    }
    const isEnd = inputRef.current.ended === true
    const isAtStart = inputRef.current.currentTime === 0
    if (isEnd || isAtStart) {
      inputRef.current.play()
    } else {
      inputRef.current.currentTime = 0
      inputRef.current.play()
    }
  }
  useImperativeHandle(ref, () => ({
    dom: inputRef.current,
    alarm: alarm
  }))
  return (
    <audio
      {...props}
      ref={inputRef}
      src={alarmMusic}
      controls={false}
      preload
    />
  )
}
const WrappedAlarmAudio = forwardRef(AlarmAudio)
export default WrappedAlarmAudio
