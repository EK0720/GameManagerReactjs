import { useState, useEffect } from "react";
import { getMessagesByUsername, deleteMessage } from "../../API";
import { Input, Button, Table, Typography, Row, Col, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const { Column } = Table;

function Chat() {
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState("");

  useEffect(() => {
    handleGetMessages();
    }, [senderName, receiverName]);
    
  const handleSenderNameChange = (event) => {
    setSenderName(event.target.value);
  };

  const handleReceiverNameChange = (event) => {
    setReceiverName(event.target.value);
  };

  const handleGetMessages = () => {
    getMessagesByUsername({ senderName, receiverName })
      .then((result) => {
        if (result.valid) {
          setMessages(result.messages);
          setError("");
        } else {
          setMessages([]);
          setError(result.reason);
        }
      })
      .catch((error) => {
        console.error(error);
        setMessages([]);
        setError("An error occurred while retrieving messages.");
      });
  };

  const handleDeleteMessage = () => {
    deleteMessage(selectedMessageId)
      .then((result) => {
        if (result.valid) {
          setMessages(messages.filter((message) => message.id !== selectedMessageId));
          setDeleteModalVisible(false);
        } else {
          setError("Failed to delete message.");
        }
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while deleting the message.");
      });
  };

  const showDeleteModal = (messageId) => {
    setSelectedMessageId(messageId);
    setDeleteModalVisible(true);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  return (
    <div>
      <Typography.Title level={2}>Chat</Typography.Title>
      <Row gutter={16} style={{ marginBottom: 30 }}>
        <Col span={12}>
          <Input placeholder="Sender Name" value={senderName} onChange={handleSenderNameChange} />
        </Col>
        <Col span={12}>
          <Input placeholder="Receiver Name" value={receiverName} onChange={handleReceiverNameChange} />
        </Col>
      </Row>
      <Button type="primary" onClick={handleGetMessages}>
        Get Messages
      </Button>
      {error && <p>Error: {error}</p>}
      {messages.length > 0 && (
        <Table dataSource={messages} pagination={false}>
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="Sender ID" dataIndex="sender_id" key="sender_id" />
          <Column title="Receiver ID" dataIndex="receiver_id" key="receiver_id" />
          <Column title="Message" dataIndex="message" key="message" />
          <Column title="Create Time" dataIndex="createTime" key="createTime" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Button type="text"
              danger
              icon={<DeleteOutlined />} onClick={() => showDeleteModal(record.id)}>
              </Button>
            )}
          />
        </Table>
      )}
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDeleteMessage}
        onCancel={hideDeleteModal}
      >
        <p>Are you sure you want to delete this message?</p>
      </Modal>
    </div>
  );
}

export default Chat;