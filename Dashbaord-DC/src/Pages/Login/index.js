import React, { useEffect, useState } from "react";
import { Form, Input, Button, Typography, Space, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const url = "https://xuseme.preciousresidency.com";
const { Title } = Typography;

const Login = () => {
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [isOTPSend, setIsOTPSend] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async () => {
    if (phone) {
      try {
        setLoading(true);
        const data = {
          mobile: phone,
          type: 'partner'
        }
        let response = await fetch(`${url}/api/user/login`,
          {
            method: "POST", // or 'PUT'
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        response = await response.json();

        alert(`Your OTP is ${response.otp}`)
        setIsOTPSend(isOTPSend => !isOTPSend)
      } catch (error) {
        message.warning("Please Provide valid Phone Number!");
      }
    } else {
      message.warning("Please Provide Phone Number!");
    }
  };

  const handleVerifyOTP = async () => {
    if (otp) {
      try {

        const data = {
          mobile: phone,
          type: 'partner',
          otp: otp
        }
        let response = await fetch(`${url}/api/user/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
        response = await response.json();
        console.log(response);
        alert(`LogIn Successful`)
        localStorage.setItem("userInfo", JSON.stringify(response));
        navigate('/dashboard');
        window.reload()
      } catch (error) {
        message.error("Error Occurred: " + error.response.data.message);
        setLoading(false);
      }
    } else {
      message.warning("Please Provide OTP!");
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      alert("Please fill in all mandatory fields.");
      setLoading(false);
      return;
    }

    try {
      const data = {
        email,
        password,
      };

      let response = await fetch(`${url}/api/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      response = await response.json();

      if (response.success) {
        alert("Login Successful");
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setLoading(false);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials.");
        setLoading(false);
      }
    } catch (error) {
      alert("Error Occurred: " + error.message);
      setLoading(false);
    }
  };

  const handleLoading = () => {
    let userInfo = localStorage.getItem('userInfo')
    userInfo = JSON.parse(userInfo)
    console.log("userInfo", userInfo);
    if (userInfo?.token) navigate('/dashboard')
  }

  useEffect(() => {
    handleLoading()
  }, [])

  return (
    <div className="login-page">
      <Space className="loginPageBox" size="5px" direction="vertical">
        <Title level={4}>Admin (Locked)</Title>
        <Form>
          <Form.Item label="Phone" name="phone" rules={[{ required: true, message: "Please enter your phone number" }]}>
            <Input placeholder="Enter Your Phone" onChange={(e) => setPhone(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={handleSendOTP}>
              Send OTP
            </Button>
          </Form.Item>
          {isOTPSend ? (
            <>
              <Form.Item label="Enter OTP:" name="otp" rules={[{ required: true, message: "Please enter your OTP" }]}>
                <Input placeholder="Enter Your OTP here" onChange={(e) => setOtp(e.target.value)} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="button" onClick={handleVerifyOTP}>
                  Verify OTP
                </Button>
              </Form.Item>
            </>
          ) : (
            <>
              <Typography.Text strong>OR LOGIN USING EMAIL AND PASSWORD</Typography.Text>
              <Form.Item label="Username" name="email" rules={[{ required: true, message: "Please enter your username" }]}>
                <Input placeholder="Enter Your Email" onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                <Input.Password
                  placeholder="Enter Your Password"
                  iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="button" onClick={submitHandler} loading={loading}>
                  Login
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Space>
    </div>
  );
};

export default Login;