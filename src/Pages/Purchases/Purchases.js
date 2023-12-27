import React, { useState, useEffect } from "react";
import { Space, Typography, Table } from "antd";
import { getPurchases } from "../../API";
import AppPlayerInfoNav from "../../Components/AppPlayerInfoNav/AppPlayerInfoNav";
import { useParams } from "react-router-dom";

const { Title } = Typography;

function Purchases() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [purchaseList, setPurchaseList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const username = localStorage.getItem("username"); // Lấy username từ localStorage
    if (username) {
      getPurchases(username)
        .then((res) => {
          setPurchaseList(res.purchases);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "user_id",
    },
    {
      title: "Item Name",
      dataIndex: "item_name",
      key: "item_name",
    },
    {
      title: "Create Time",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "Update Time",
      dataIndex: "latestUpdate",
      key: "latestUpdate",
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <Title level={4} style={{ marginBottom: 30 }}>
        Account / {id}
      </Title>
      <AppPlayerInfoNav id={id} />
      <Title style={{marginBottom: 30}} level={4}>Purchases</Title>
    <Space size={20} direction="vertical">
      <Table
        columns={columns}
        dataSource={purchaseList}
        loading={loading}
        rowKey="id"
      />
    </Space>
    </div>
  );
}

export default Purchases;