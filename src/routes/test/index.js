import React from 'react'
import useReduxs from './useReducer'

const TestPage = () => {
  const {store, dispatch} = useReduxs({name:'reduxs', user:{age: 12}})
  console.log({store})
  return (
    <div>
      test page
      <p>
        <button
          onClick={() => {
            dispatch({type: 'user/info.name', payload: 'sharon'})
          }}
        >change user scope</button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({type: 'prod/info.name', payload: 'reduxs'})
          }}
        >change prod scope</button>
      </p>
      <p>
        <button>change test scope</button>
      </p>
    </div>
  )
}

export default TestPage
