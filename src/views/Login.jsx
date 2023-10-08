import { Form, Input, Spin, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_BASE_URL}/testapi/auth/login`, {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        sessionStorage.setItem('tokenCMSAdmin', response.data.token);
        navigate('/dashboard');
      })
      .catch((error) => {
        setLoading(false); // Ensure loading is set to false
        if (error.response) {
          // Server returned an error response
          message.error('Login failed. Please check your email and password.');
        } else {
          // Network or other errors
          message.error('An error occurred. Please try again later.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 h-screen">
        <div className="text-2xl font-semibold text-blue-500">Login Here!</div>
        <Spin spinning={loading}>
          <Form
            name="basic"
            style={{
              width: 600,
            }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email format',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 8,
                  message: 'Password must 8 characters',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <button
                className={`w-full  py-2 px-4  cursor-pointer text-white ${
                  loading ? 'bg-gray-400' : 'bg-blue-400 hover:bg-blue-500'
                }`}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Submit'}
              </button>
            </Form.Item>
          </Form>
        </Spin>
      </div>
    </>
  );
}
