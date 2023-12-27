import { Space, Table, Typography, Button, Modal, message, Input } from "antd";
import { DeleteOutlined, ExclamationCircleOutlined, UserAddOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getAccounts, deleteUser } from "../../API";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;

function Accounts() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getAccounts()
      .then((res) => {
        const newData = res.map((item) => ({
          id: item.id,
          user: item.userName,
          displayName: item.displayName,
          online: item.online,
          latestUpdate: item.latestUpdate,
        }));
        setDataSource(newData);
      })
      .finally(() => setLoading(false));
  }, []);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this user?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleRemove(id);
      },
    });
  };

  const handleRemove = (id) => {
    setLoading(true);
    deleteUser(id)
      .then(() => {
        const updatedDataSource = dataSource.filter((item) => item.id !== id);
        setDataSource(updatedDataSource);
        setLoading(false);
        message.success("User deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        setLoading(false);
        message.error("Error deleting user");
      });
  };

  const handleRowClick = (record) => {
    if (record.id !== '00000000-0000-0000-0000-000000000000') {
      navigate(`/accounts/${record.id}/profile`);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleCreateAccount = () => {
    navigate('/create');
  };

  const filteredDataSource = dataSource.filter((item) =>
    item.user.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Player Account</Typography.Title>
      <Space>
        <Input.Search
          placeholder="Search by user"
          allowClear
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={handleCreateAccount}
        >
          Create Account
        </Button>
      </Space>
      <Table
        loading={loading}
        columns={[
          {
            title: "ID",
            dataIndex: "id",
            render: (text, record) => (
              <Button type="link" onClick={() => handleRowClick(record)}>
                {text}
              </Button>
            ),
          },
          {
            title: "User",
            dataIndex: "user",
          },
          {
            title: "DisplayName",
            dataIndex: "displayName",
          },
          {
            title: "online",
            dataIndex: "online",
          },
          {
            title: "Last Update",
            dataIndex: "latestUpdate",
          },
          {
            title: "Remove",
            dataIndex: "id",
            render: (id, record) => (
              record.id !== '00000000-0000-0000-0000-000000000000' && (
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => showDeleteConfirm(id)}
                />
              )
            ),
          },
        ]}
        dataSource={filteredDataSource}
        pagination={{
          pageSize: 5,
        }}
      />
    </Space>
  );
}

export default Accounts;
