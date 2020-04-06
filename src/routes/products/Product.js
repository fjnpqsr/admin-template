import React from 'react'
import { connect } from 'react-redux'

const Products = (props) => {
  console.log({ props }, 'products')
  return (
    <h1>
      Products
      <button onClick={() => { props.dispatch({ type: 'products/test' }) }}>hit count</button>
    </h1>
  )
}

export default connect(state => ({ ...state.products }))(Products)
