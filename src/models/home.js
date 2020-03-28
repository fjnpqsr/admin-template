export default {
  namespace: 'home',
  state: {
    count: 1
  },
  effects: {},
  reducers: {
    update: (state, { payload }) => {
      return { ...state, ...payload }
    }
  }
}
