import React, { useState, useEffect } from "react";
import { Space, Typography, Table, Button, Modal, message } from "antd";
import { getFriendList, removeFriend } from "../../API";
import { useParams } from "react-router-dom";

import AppPlayerInfoNav from "../../Components/AppPlayerInfoNav/AppPlayerInfoNav";
const { Title } = Typography;

function Friend() {
  const [friendList, setFriendList] = useState([]);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const { id } = useParams();
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await getFriendList(id);
      const formattedData = response.friendData.map((friend) => {
        const {userId, username, status, latestUpdate } = friend;
        return {userId, username, status, latestUpdate };
      });
      setFriendList(formattedData);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const showRemoveModal = (friend) => {
    setSelectedFriend(friend);
    setRemoveModalVisible(true);
  };

  const handleRemoveFriend = async () => {
    try {
      if (selectedFriend) {
        await removeFriend(username, selectedFriend.username);
        message.success("Friend removed successfully");
        setRemoveModalVisible(false);
        setSelectedFriend(null);
        fetchData();
      }
    } catch (error) {
      console.log("Error:", error);
      message.error("Failed to remove friend");
    }
  };

  const handleCancelRemove = () => {
    setRemoveModalVisible(false);
    setSelectedFriend(null);
  };

  const columns = [
    {
      title: "UserId",
      dataIndex: "userId",
      key: "username",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Update Time",
      dataIndex: "latestUpdate",
      key: "latestUpdate",
    },
    {
      title: "Remove",
      key: "remove",
      render: (_, record) => (
        <Button
          type="primary"
          danger
          onClick={() => showRemoveModal(record)}
        >
          Remove
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={4} style={{ marginBottom: 30 }}>
        Account / {id}
      </Title>
      <AppPlayerInfoNav id={id} />
      <Space size={20} direction="vertical">
        <Title level={4}>Friend</Title>
        {friendList.length > 0 ? (
          <Table columns={columns} dataSource={friendList} rowKey="username" />
        ) : (
          <p>No friends found.</p>
        )}
      </Space>

      <Modal
        title="Remove Friend"
        visible={removeModalVisible}
        onOk={handleRemoveFriend}
        onCancel={handleCancelRemove}
        okText="Remove"
        cancelText="Cancel"
      >
        <p>Are you sure you want to remove {selectedFriend?.username}?</p>
      </Modal>
    </div>
  );
}

export default Friend;