import React from 'react'
import { Form, Input, Button } from 'antd'
import { connect } from 'react-redux'
import css from './Login.module.scss'

const FormItem = Form.Item

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 }
}

const LoginPage = ({ submitting, dispatch, ...props }) => {
  const [form] = Form.useForm()
  const login = () => {
    form.validateFields().then(values => {
      dispatch({ type: 'login/login', payload: values })
    })
  }
  return (
    <div className={css.pageWrapper}>
      <div className={css.loginContainer} >
        <Form form={form} {...layout} >
          <FormItem
            label='用户名'
            name='username'
            rules={[
              { required: true, message: '请输入用户名' }
            ]}
          >
            <Input />
          </FormItem>
          <FormItem
            label='密码'
            name='password'
            rules={[
              { required: true, message: '请输入密码' }
            ]}
          >
            <Input.Password />
          </FormItem>
          <div style={{ textAlign: 'center' }}>
            <Button
              size='small'
              type='primary'
              onClick={() => { login() }}
              loading={submitting}
              style={{ marginRight: '12px' }}
            >登录</Button>
            <Button size='small'>注册</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default connect(state => ({
  ...state.login
}))(LoginPage)
