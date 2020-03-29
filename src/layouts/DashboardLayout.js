import React from 'react'
import { connect } from 'react-redux'
import { Layout, Menu, Modal } from 'antd'
import {
  UploadOutlined,
  VideoCameraOutlined,
  UserOutlined
} from '@ant-design/icons'
import css from './DashboardStyle.module.scss'
import RelatedSwitch from '../components/RelatedSwitch'
import { Link, Route } from 'react-router-dom'
import NotFoundPage from '../routes/Exception/404'

const { Header, Content, Sider, Footer } = Layout

class DashBoardLayout extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      collapsed: false
    }
    this.exit = this.exit.bind(this)
  }
  exit () {
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
    const { history, match, context = {} } = this.props
    const { userInfo } = context
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
              <Menu mode='inline' defaultSelectedKeys={['1']}>
                <Menu.Item key='1' onClick={() => { history.push('/dashboard/products') }}>
                  <UserOutlined />
                  <span className='nav-text' >nav 1</span>
                </Menu.Item>
                <Menu.Item key='2' onClick={() => { history.push('/dashboard/users') }}>
                  <VideoCameraOutlined />
                  <span className='nav-text'>nav 2</span>
                </Menu.Item>
                <Menu.Item key='3' onClick={() => { history.push('/dashboard/settings') }}>
                  <UploadOutlined />
                  <span className='nav-text'>nav 3</span>
                </Menu.Item>
                <Menu.Item key='4' onClick={() => { history.push('/dashboard/about') }}>
                  <UserOutlined />
                  <span className='nav-text'>nav 4</span>
                </Menu.Item>
              </Menu>
            </Sider>
          </div>
        </section>
        <Layout>
          <Header className={css.layoutHeader} >
            {!userInfo && <Link to='/login'>登录</Link>}
            {userInfo && <span style={{ color: '#1890ff', cursor: 'pointer' }} onClick={this.exit}>退出</span>}
          </Header>
          <Content >
            <div className='site-layout-background'>
              <RelatedSwitch match={match} redirectPath={'/dashboard/exception/403'} >
                <Route component={NotFoundPage} />
              </RelatedSwitch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default connect()(DashBoardLayout)
