import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Table, Typography } from 'antd';
function getSocket() {
  if (!window.socket) {
    window.socket = io("ws://localhost:52300");
  }
  return window.socket;
}
const Matches = () => {
  const [lobbyInfos, setLobbyInfos] = useState([]);

  useEffect(() => {
    const socket = getSocket();

    // Gửi yêu cầu lobbyInfo ngay sau khi socket được tạo
    socket.emit('lobbyInfo');

    // Lắng nghe phản hồi lobbyInfo
    socket.on('lobbyInfo', (data) => {
      setLobbyInfos(data.lobbies);
    });
    window.addEventListener('beforeunload', () => {
      socket.disconnect();
    });
    // Disconnect socket when component unmounts
    return () => {
      window.addEventListener('beforeunload', () => {
        socket.disconnect();
      });
    };
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'lobbyId',
      key: 'lobbyId',
    },
    {
      title: 'Connected Players',
      dataIndex: 'connectedPlayers',
      key: 'connectedPlayers',
    },
    {
      title: 'Game Mode',
      dataIndex: 'gameMode',
      key: 'gameMode',
    },
    {
      title: 'Max Player',
      dataIndex: 'maxPlayers',
      key: 'maxPlayers',
    },
    {
      title: 'Min Player',
      dataIndex: 'minPlayers',
      key: 'minPlayers',
    },
    {
      title: 'Status',
      dataIndex: 'currentState',
      key: 'currentState',
    },
  ];

  return (
    <div>
      <Typography.Title level={4}>Danh sách phòng</Typography.Title>
      <Table columns={columns} dataSource={lobbyInfos} pagination={false} />
    </div>
  );
};

export default Matches;