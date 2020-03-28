
const NAMESPACE = 'CONTEXT'
const UPDATE = `${NAMESPACE}/UPDATE`
const REMOVE = `${NAMESPACE}/REMOVE`
const STORAGE_KEY = 'app@context'

const initContext = {
  ...JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}')
}

function createContext (app) {
  const update = (payload = {}) => {
    app.dispatch({ type: UPDATE, payload: { ...payload } })
  }

  const remove = (contextKey) => {
    app.dispatch({ type: REMOVE, payload: contextKey })
  }

  function save (context) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(context))
    app.context = {
      ...context,
      update: update,
      remove: remove
    }
  }

  const extraReducers = {
    [NAMESPACE] (state = initContext, { type, payload }) {
      let newState
      switch (type) {
        case UPDATE:
          newState = { ...state, ...payload }
          break
        case REMOVE:
          newState = state
          delete newState[payload]
          break
        default:
          newState = state
          break
      }
      save(newState)
      return newState
    }
  }
  return {
    extraReducers
  }
}

export default createContext
