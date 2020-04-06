export default {
  namespace: 'products',
  state: { count: 1 },
  effects: {
    * test ({ payload, history }, { put, select, ...props }) {
      const { count } = yield select(state => state.products)
      yield put({ type: 'update', payload: { count: count + 1 } })
    }
  },
  reducers: {
    update (state, { payload }) {
      return { ...state, ...payload }
    }
  }
}
