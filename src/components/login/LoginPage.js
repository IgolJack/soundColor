import React, { useCallback, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { auth } from '../firebase/firebase'
import firebase from '../firebase/firebase'
import { AuthContext } from "./Auth.js";

import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 0 },
};
const tailLayout = {
  wrapperCol: { offset: 0, span: 0 },
};


const LoginPage = (props) => {
  let checked = false

  const handleLogin = useCallback(
    async values => {
      try {
        await auth.signInWithEmailAndPassword(values.email, values.password)
          .then(function () {
            onFinish()
          }
          )
        if (checked === false) {
          auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
        }
        else if (checked === true) {
          auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        }
      }
      catch (error) {
        errorRed(error)
      }
    },
  );

  const onClick = () => {
    checked = !checked
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const errorRed = (error) => {
    message.error(String(error));
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }



  return (
    <div style={{ padding: '15px' }}>
      <h1 style={{ textAlign: "center" }}>Авторизироваться</h1>

      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={handleLogin}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item

          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input addonBefore="Email" prefix={<UserOutlined className="site-form-item-icon" />} name="email" />
        </Form.Item>

        <Form.Item

          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password addonBefore="Пароль" prefix={<LockOutlined className="site-form-item-icon" />} name="password" />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" >
          <Checkbox defaultChecked={checked} onClick={onClick}>Запомнить меня</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button style={{ width: '100%', margin: '8px' }} type="primary" htmlType="submit">
            Войти
        </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(LoginPage);