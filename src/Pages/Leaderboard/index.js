import { Space, Table, Typography, Select } from "antd";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../../API";

const { Option } = Select;

function Leaderboard() {
  const [loading, setLoading] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [gameName, setGameName] = useState("FruitMemory");

  useEffect(() => {
    setLoading(true);
    const top = 10; // Số lượng top đứng đầu tùy chọn
    
    // Kiểm tra nếu gameName không có giá trị, đặt mặc định là "FruitMemory"
    const selectedGameName = gameName || "FruitMemory";
    
    getLeaderboard(top, selectedGameName).then((res) => {
      setLeaderboard(res.leaderboard);
      setLoading(false);
    });
  }, [gameName]);

  const handleGameChange = (value) => {
    setGameName(value);
  };

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      render: (text, record, index) => index + 1,
    },
    {
      title: "User ID",
      dataIndex: "user_id",
    },
    {
      title: "Username",
      dataIndex: "username",
    },
    {
      title: "Score",
      dataIndex: "score",
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
    },
  ];

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Leaderboard</Typography.Title>
      <Select defaultValue={gameName} onChange={handleGameChange}>
        <Option value="FruitMemory">Fruit Memory</Option>
        <Option value="TagGame">Tag Game</Option>
      </Select>
      <Table
        loading={loading}
        columns={columns}
        dataSource={leaderboard}
        pagination={{
          pageSize: 10,
        }}
      />
    </Space>
  );
}

export default Leaderboard;