import React from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined } from "@ant-design/icons";
import "./login.css";

function App() {
  const [form] = Form.useForm();

  const handleSubmit = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="login-page">
      <Form 
        form={form} 
        onFinish={handleSubmit} 
        className="login-form"
        initialValues={{ remember: true }} 
      >
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please Enter LogIn Password" }]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0, 0, 0, .25)" }} />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            LogIn
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default App;
