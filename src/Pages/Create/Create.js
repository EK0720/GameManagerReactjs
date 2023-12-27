import React, { useState } from "react";
import { Typography, Input, Button, Space, message } from "antd";
import { createAccount } from "../../API";

const { Title } = Typography;

function Create() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCreateAccount = async () => {
    try {
      const response = await createAccount({ username, email, password });
      console.log("Response:", response);
      if (response.valid) {
        message.success(response.reason);
      } else {
        message.error(response.reason);
      }
    } catch (error) {
      console.log("Error:", error);
      message.error("Có lỗi xảy ra khi tạo tài khoản!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={4} style={{ marginBottom: 30 }}>
        Create Account
      </Title>
      <Space direction="vertical" size={20}>
        <Space>
          <strong style={{marginRight: 10}}>Username:</strong>
          <Input value={username} onChange={handleUsernameChange} />
        </Space>
        <Space>
          <strong style={{marginRight: 27}}>Email:</strong>
          <Input value={email} onChange={handleEmailChange} />
        </Space>
        <Space>
          <strong>Password:</strong>
          <Input.Password value={password} onChange={handlePasswordChange} />
        </Space>
        <Button type="primary" onClick={handleCreateAccount}>Create</Button>
      </Space>
    </div>
  );
}

export default Create;
