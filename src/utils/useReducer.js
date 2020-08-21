import {useReducer} from 'react'


const SCOPES_SPLITER = '.'
const defaultState = {
}

const writeDeepProps = function (obj, path, value) {
  const state = {};

  const _path = path.split(SCOPES_SPLITER);
  const handleArr = [state].concat(_path);

  handleArr.reduce((root, current, index) => {
    if (index !== handleArr.length -1) {
      if (!root[current]) {
        root[current] = {}
      }
      return root[current]
    } else {
      return root[current] = value
    }
  });

  return state
}

// type: 'user/username'
// type: 'user/info.age'
const updateState = (state, {type, payload}) => {
  const [modal, modalScope] =  type.split('/')
  const nextState = {...state}
  if (!nextState[modal]) {
    nextState[modal] = {}
  }
  nextState[modal] = {...nextState[modal], ...writeDeepProps(nextState[modal], modalScope, payload)}
  return nextState
}
export default function (initState = defaultState) {
  const [store, dispatch] = useReducer(updateState, initState );

  return {
    useDispatch: dispatch,
    useStore: store
  }
}
