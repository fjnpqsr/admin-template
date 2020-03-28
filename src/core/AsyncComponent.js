import React, { Suspense } from 'react'
import { connect } from 'react-redux'
const DefaultLoading = () => <div>loading</div>

function loadModels (prevProps = {}) {
  const { app = {}, models = [], modelResolver } = prevProps
  const { _models = [] } = app
  models.forEach(m => {
    if (!_models.some(model => model.namespace === m)) {
      const mo = modelResolver(m).default || modelResolver(m)
      registerModel(mo)
    }
  })
  // 注册model
  function registerModel (model) {
    app.model(model)
  }
}
// 实现路由页面的懒加载

class AsyncComponent extends React.Component {
  static getDerivedStateFromProps (prevProps, prevState) {
    const { models = [], app = {} } = prevProps
    const { _models = [] } = app
    const existModels = _models.map(item => item.namespace)
    if (!models.every(m => existModels.includes(m))) {
      loadModels(prevProps)
    }
    return null
  }
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {
      app = {},
      component: Component,
      models,
      modelResolver,
      ...inheritProps
    } = this.props
    const { loadingComponent: LoadingComponent } = app
    const Loading = LoadingComponent || DefaultLoading
    return (
      <Suspense fallback={<Loading />} >
        <Component {...inheritProps} />
      </Suspense>
    )
  }
}
export default connect(state => ({ context: state.CONTEXT }))(AsyncComponent)
