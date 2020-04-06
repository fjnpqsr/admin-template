import { login } from '../services/login'
import { message } from 'antd'
import { app, setAuthorization } from '../core'
import * as routerRedux from 'connected-react-router'

const USER_INFO_CONTEXT_NAME = 'userInfo'

export default {
  namespace: 'login',
  state: {
    submitting: false
  },
  effects: {
    * login ({ payload = {} }, { put, call }) {
      try {
        yield put({ type: 'update', payload: { submitting: true } })
        const data = yield call(login, payload)
        const { user } = data
        yield put({ type: 'update', payload: { submitting: false } })
        app.context.update({ [USER_INFO_CONTEXT_NAME]: user })
        setAuthorization('member')
        yield put(routerRedux.push('/'))
      } catch (e) {
        yield put({ type: 'update', payload: { submitting: false } })
        message.destroy()
        message.error('账号或密码错误')
      }
    },
    * exit ({ payload = {} }, { put, call, ...props }) {
      try {
        app.context.remove(USER_INFO_CONTEXT_NAME)
        setAuthorization()
        yield put(routerRedux.push('/login'))
      } catch (e) {
        console.log(e)
        message.destroy()
        message.error('退出失败')
      }
    }
  },
  reducers: {
    update: (state, { payload }) => {
      return { ...state, ...payload }
    }
  }
}
