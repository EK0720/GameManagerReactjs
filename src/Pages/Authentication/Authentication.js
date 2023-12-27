import React, { useState, useEffect } from "react";
import { Typography, Input, Button, Space } from "antd";
import { getAccounts, getUpdateAccounts } from "../../API";
import AppPlayerInfoNav from "../../Components/AppPlayerInfoNav/AppPlayerInfoNav";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function Authentication() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchAccount();
  }, []);

  const fetchAccount = async () => {
    try {
      const accounts = await getAccounts();
      const account = accounts.find((item) => item.id === id);
      setEmail(account.email);
      setPassword(account.password);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSaveProfile = async () => {
    try {
      const updatedAccount = await getUpdateAccounts(id, { email, password });
      console.log("Updated Account:", updatedAccount);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
      <div style={{ padding: 20 }}>
      <Title level={4} style={{ marginBottom: 30 }}>
        Account / {id}
      </Title>
      <AppPlayerInfoNav id={id} />
      <Title style={{marginBottom: 30}} level={4}>Authentication</Title>
      <Space direction="vertical" size={20}>
        <Space>
          <strong style={{marginRight: 27}}>Email:</strong>
          <Input value={email} onChange={handleEmailChange} />
        </Space>
        <Space>
          <strong>Password:</strong>
          <Input.Password value={password} onChange={handlePasswordChange} />
        </Space>
        <Button type="primary" onClick={handleSaveProfile}>Save</Button>
      </Space>
    </div>
  );
}

export default Authentication;