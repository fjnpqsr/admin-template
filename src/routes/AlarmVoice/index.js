import React, { useRef } from 'react'
import AlarmAudio from '../../components/AlarmAudio'

const AlarmVoicePage = (props) => {
  const audioRef = useRef()
  return (
    <div>
      <AlarmAudio ref={audioRef} />
      <button
        onClick={() => {
          console.log({ audioRef })
          audioRef.current.alarm()
        }}
      >send a warm
      </button>
    </div>
  )
}

export default AlarmVoicePage
