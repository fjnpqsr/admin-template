import React from 'react'
import {UserContext} from './userContext'

const SayHi = () => {
  return (
    <UserContext.Consumer>
      {(user) => {
        console.log({user}, '>>>>>>>>>')
        return <p>hi {user.name}</p>
      }}
    </UserContext.Consumer>
  )
}


export default SayHi
