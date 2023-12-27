import { AppstoreOutlined, TrophyOutlined, MessageOutlined, UserOutlined, LogoutOutlined, HistoryOutlined } from '@ant-design/icons';
import { Menu, Typography, Avatar } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const { Title } = Typography;

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState('/');

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate('/');
  };

  const avatarUrl = 'https://cdn-icons-png.flaticon.com/512/8002/8002111.png'; // Thay đổi đường dẫn URL của avatar tại đây

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi local storage
    navigate('/'); // Chuyển hướng người dùng về trang chủ sau khi đăng xuất
  };

  return (
    <div className="SideMenu">
      <div className="TopSection" style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <Link to="/" onClick={handleRedirect}>
          <Avatar size={40} src={avatarUrl} icon={<UserOutlined />} style={{ marginRight: 10, marginLeft: 20, marginTop: 15 }} />
        </Link>
        <Title level={3}>
          <Link to="/" onClick={handleRedirect}>
            Nahama
          </Link>
        </Title>
      </div>
      <nav className="MenuContainer">
        <Menu
          className="SideMenuVertical"
          mode="vertical"
          onClick={(item) => {
            navigate(item.key);
          }}
          selectedKeys={[selectedKeys]}
          items={[
            {
              label: 'Dashboard',
              icon: <AppstoreOutlined />,
              key: '/',
            },
            {
              label: 'Matches',
              key: '/matches',
              icon: <HistoryOutlined />,
            },
            {
              label: 'Leaderboard',
              key: '/leaderboard',
              icon: <TrophyOutlined />,
            },
            {
              label: 'Chat',
              key: '/chat',
              icon: <MessageOutlined />,
            },
            {
              label: 'Accounts',
              key: '/accounts',
              icon: <UserOutlined />,
            },
          ]}
        />
      </nav>
      <div className="BottomMenu" style={{ marginTop: 'auto', marginBottom: 20, paddingLeft: 20 }}>
        <p>Logged in as: Admin</p>
        <Link to="/Login" onClick={handleLogout}>
          <LogoutOutlined style={{ marginRight: 5 }} />
          Logout
        </Link>
      </div>
    </div>
  );
}

export default SideMenu;
