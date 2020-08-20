import React from 'react'

const SelfIntro = (props) => {
  return (
    <div>
      <p>self intro</p>
      <hr/>
      {props.children}
    </div>
  )
}

export default SelfIntro
