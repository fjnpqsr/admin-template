import { useState, useRef } from 'react'

function useAudio () {
  const [audioIns, setAudioIns] = useState(null)
  const audioRef = useRef()
  return {
    audioIns: audioIns,
    setAudioIns,
    audioRef
  }
}

export default useAudio
