import * as routerRedux from 'connected-react-router'

function withHistory () {
  function onEffect (effect, model, actionType) {
    return function * (...args) {
      args[0].history = routerRedux
      yield effect(...args)
    }
  }

  return {
    onEffect
  }
}

export default withHistory
