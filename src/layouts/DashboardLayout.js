import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Modal, Breadcrumb } from 'antd'
import css from './DashboardStyle.module.scss'
import RelatedSwitch from '../components/RelatedSwitch'
import { Link, Route } from 'react-router-dom'
import NotFoundPage from '../routes/Exception/404'
import menus from './menus'

const { Header, Content, Sider } = Layout

class DashBoardLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
    this.handleExit = this.handleExit.bind(this)
  }

  handleExit () {
    const { dispatch } = this.props
    Modal.confirm({
      title: '退出',
      content: '您确定要退出登录?',
      okType: 'danger',
      onOk: () => {
        dispatch({ type: 'login/exit' })
      }
    })
  }

  render () {
    const { history, match, context = {}, location = {}, routerData = {} } = this.props
    const { userInfo } = context
    const { pathname = '' } = location
    const paths = pathname.split('/').filter(p => !!p).reduce((total, current, currIndex) => {
      if (currIndex === 0) {
        return total.concat(`/${current}`)
      }
      return total.concat(`${total[total.length - 1]}/${current}`)
    }, [])

    return (
      <Layout className={css.layoutContainer}>
        <section className={css.siderWrapper}>
          <div className={css.siderContainer}>
            <Sider
              theme='light'
              style={{ minHeight: '100%' }}
              breakpoint='lg'
              collapsedWidth='0'
            >
              <div className={css.logo} />
              <Menu mode='inline' defaultSelectedKeys={menus[0] ? menus[0].path : ''}>
                {menus.map(m => (
                  <Menu.Item key={m.path} onClick={() => { history.push(m.path) }}>
                    <span className='nav-text'>{m.title}</span>
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
          </div>
        </section>
        <Layout>
          <Header className={css.layoutHeader}>
            {!userInfo && <Link to='/login'>登录</Link>}
            {userInfo && <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={this.handleExit}>退出</span>}
          </Header>
          <section className={css.breadcrumbLine}>
            <Breadcrumb>
              {paths.map(path => (
                <Breadcrumb.Item key={path}>
                  <a href={path}>{routerData[path] ? routerData[path].title : ''}</a>
                </Breadcrumb.Item>
              ))}
            </Breadcrumb>
          </section>
          <Content className={css.contentWrap}>
            <div className={css.content}>
              <RelatedSwitch match={match} redirectPath='/dashboard/exception/403'>
                <Route component={NotFoundPage} />
              </RelatedSwitch>
            </div>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
      </Layout>
    )
  }
}
export default connect()(DashBoardLayout)
