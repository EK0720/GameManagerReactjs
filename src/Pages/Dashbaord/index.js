import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  LoadingOutlined,
  HistoryOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { Card, Space, Statistic, Typography } from "antd";
import { getAccounts } from "../../API";
import io from "socket.io-client";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
function getSocket() {
  if (!window.socket) {
    window.socket = io("ws://localhost:52300");
  }
  return window.socket;
}

function Dashboard() {
  const [connections, setConnections] = useState(0);
  const [userOnline, setUserOnline] = useState(0);
  const [accounts, setAccounts] = useState(0);
  const [lobbyInfos, setLobbyInfos] = useState([]);

  useEffect(() => {
    getAccounts().then((res) => {
      let onlinePlayerCount = res.filter((item) => item.online === 1).length;
      setUserOnline(onlinePlayerCount);
      setAccounts(res.length);
    });

    const socket = getSocket();
    socket.emit("lobbyInfo");
    socket.emit("getNumberConnection");

    socket.on("connect", () => {
      setConnections((prevConnections) => prevConnections - 1);
    });

    socket.on("lobbyInfo", (data) => {
      setLobbyInfos(data.lobbies);
    });

    socket.on("getNumberConnection", (data) => {
      setConnections(data - 1);
    });
    window.addEventListener('beforeunload', () => {
      socket.disconnect();
    });
    return () => {
      window.addEventListener('beforeunload', () => {
        socket.disconnect();
      });
    };
  }, []);

  const chartData = {
    labels: ["Connections", "User Online", "Matches"],
    datasets: [
      {
        label: "Dashboard",
        data: [connections, userOnline, lobbyInfos.length],
        backgroundColor: [
          "rgba(0,255,0,0.25)", // Màu cho Connections
          "rgba(0,255,255,0.25)", // Màu cho User Online
          "rgba(0,0,255,0.25)", // Màu cho Matches
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Dashboard</Typography.Title>
      <Space direction="horizontal">
        <DashboardCard
          icon={
            <LoadingOutlined
              style={{
                color: "green",
                backgroundColor: "rgba(0,255,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Connections"}
          value={connections}
        />
        <DashboardCard
          icon={
            <HistoryOutlined
              style={{
                color: "blue",
                backgroundColor: "rgba(0,0,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Matches"}
          value={lobbyInfos.length}
        />
        <DashboardCard
          icon={
            <ApiOutlined
              style={{
                color: "purple",
                backgroundColor: "rgba(0,255,255,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"User Online"}
          value={userOnline}
        />
        <DashboardCard
          icon={
            <UserOutlined
              style={{
                color: "red",
                backgroundColor: "rgba(255,0,0,0.25)",
                borderRadius: 20,
                fontSize: 24,
                padding: 8,
              }}
            />
          }
          title={"Accounts"}
          value={accounts}
        />
      </Space>
      <Card>
        <Bar data={chartData} options={chartOptions} />
      </Card>
    </Space>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <Card>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;