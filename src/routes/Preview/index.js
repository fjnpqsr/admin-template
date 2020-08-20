import React, {Fragment, useState} from 'react'
import {GUEST, UserContext} from './userContext'
import SayHi from './SayHi'
import SelfIntro from './SelfIntro'

const Preview = (props) => {
  const [state, setState] = useState(GUEST)
  return (
    <Fragment>
      <UserContext.Provider value={state}>
        <h1>context</h1>
        <SelfIntro>
          <SayHi />
        </SelfIntro>
      </UserContext.Provider>
      <button
        onClick={() => {
          setState({name: 'sharon'})
        }}
      >login</button>
    </Fragment>
  )
}

export default Preview
