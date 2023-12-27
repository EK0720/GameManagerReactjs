import React, { useState, useEffect } from "react";
import { Space, Typography, Input, Button, message, Row, Col } from "antd";
import { getAccounts, getUpdateAccounts } from "../../API";
import AppPlayerInfoNav from "../../Components/AppPlayerInfoNav/AppPlayerInfoNav";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function Profile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    setLoading(true);
    getAccounts()
      .then((res) => {
        const user = res.find((item) => item.id === id);
        setUserData(user);
        setEditableData(user);
        localStorage.setItem("username", user.userName);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setEditableData((prevData) => ({
        ...prevData,
        userName: username,
      }));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveProfile = () => {
    setLoading(true);
    getUpdateAccounts(id, editableData)
      .then(() => {
        setUserData(editableData);
        message.success("Profile updated successfully");
        localStorage.setItem("username", editableData.userName);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        message.error("Error updating profile");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ padding: 20 }}>
      <Title level={4} style={{ marginBottom: 30 }}>
        Account / {id}
      </Title>
      <AppPlayerInfoNav id={id} />
      <Title level={4}>Profile</Title>
      <Row gutter={40} style={{ padding: 30 }}>
        <Col span={12}>
          <Space direction="vertical" size={30} style={{ marginBottom: 20 }}>
            <Space>
              <strong>User ID:</strong>
              <span>{userData.id}</span>
            </Space>
            <Space>
              <strong>Display Name:</strong>
              {editableData.displayName ? (
                <Input
                  name="displayName"
                  value={editableData.displayName}
                  onChange={handleInputChange}
                  style={{ width: 200 }}
                />
              ) : (
                <span>{userData.displayName}</span>
              )}
            </Space>
            <Space>
              <strong>Create Time:</strong>
              <span>{userData.createTime}</span>
            </Space>
          </Space>
        </Col>
        <Col span={12}>
          <Space direction="vertical" size={40} style={{ marginBottom: 20 }}>
            <Space>
              <strong>Username:</strong>
              {editableData.userName ? (
                <Input
                  name="userName"
                  value={editableData.userName}
                  onChange={handleInputChange}
                  style={{ width: 200 }}
                />
              ) : (
                <span>{userData.userName}</span>
              )}
            </Space>
            <Space>
              <strong>Status:</strong>
              <span>{userData.online ? "Online" : "Offline"}</span>
            </Space>
            <Space>
              <strong>Update Time:</strong>
              <span>{userData.latestUpdate}</span>
            </Space>
          </Space>
        </Col>
      </Row>
      <Button type="primary" onClick={handleSaveProfile} loading={loading}>
        Save
      </Button>
    </div>
  );
}

export default Profile;