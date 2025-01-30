import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import './style.css';

const LoginForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new URLSearchParams();
      formData.append('password', values.password);

      const res = await axios.post('/api/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (res.data?.data) {
        setIsLogin(true);
      } else {
        message.error('Log In Failure!');
      }
    } catch (error) {
      message.error('Validation failed or request error.');
    }
  };

  if (isLogin) {
    navigate('/');
  }

  return (
    <div className="login-page">
      <Form form={form} onFinish={handleSubmit} className="login-form">
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please Enter Log In Password!' }]}
        >
          <Input
            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;