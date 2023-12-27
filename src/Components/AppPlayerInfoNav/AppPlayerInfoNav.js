import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';

const { Item } = Menu;

function PlayerInfoNav({ id }) {
  return (
    <Menu mode="horizontal" style={{ width: '100%', fontWeight: 'bold', fontSize: 16 }}>
      <Item key="profile">
        <NavLink to={`/accounts/${id}/profile`} activeClassName="active">Profile</NavLink>
      </Item>
      <Item key="authentication">
        <NavLink to={`/accounts/${id}/authentication`} activeClassName="active">Authentication</NavLink>
      </Item>
      <Item key="friend">
        <NavLink to={`/accounts/${id}/friend`} activeClassName="active">Friend</NavLink>
      </Item>
      <Item key="purchases">
        <NavLink to={`/accounts/${id}/purchases`} activeClassName="active">Purchases</NavLink>
      </Item>
    </Menu>
  );
}

export default PlayerInfoNav;