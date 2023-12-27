import { useEffect } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import Accounts from "../../Pages/Accounts";
import Dashboard from "../../Pages/Dashbaord";
import Leaderboard from "../../Pages/Leaderboard";
import Chat from "../../Pages/Chat";
import Profile from "../../Pages/Profile/Profile";
import Friend from "../../Pages/Friend/Friend";
import Authentication from "../../Pages/Authentication/Authentication";
import Purchases from "../../Pages/Purchases/Purchases";
import Matches from "../../Pages/Matches/Matches";
import Login from "../../Pages/Login/Login";
import Create from '../../Pages/Create/Create';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const userIsLoggedIn = localStorage.getItem('token') !== null;

  useEffect(() => {
    if (!userIsLoggedIn) {
      navigate('/Login');
    }
  }, [userIsLoggedIn, navigate]);

  return userIsLoggedIn ? children : null;
}

function AppRoutes() {
  const routes = useRoutes([
    { path: '/Login', element: <Login /> },
    { path: '/', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    { path: '/leaderboard', element: <ProtectedRoute><Leaderboard /></ProtectedRoute> },
    { path: '/chat', element: <ProtectedRoute><Chat /></ProtectedRoute> },
    { path: '/accounts', element: <ProtectedRoute><Accounts /></ProtectedRoute> },
    { path: '/accounts/:id/profile', element: <ProtectedRoute><Profile /></ProtectedRoute> },
    { path: '/accounts/:id/authentication', element: <ProtectedRoute><Authentication /></ProtectedRoute> },
    { path: '/accounts/:id/friend', element: <ProtectedRoute><Friend /></ProtectedRoute> },
    { path: '/accounts/:id/purchases', element: <ProtectedRoute><Purchases /></ProtectedRoute> },
    { path: '/matches/', element: <ProtectedRoute><Matches /></ProtectedRoute> },
    { path: '/create', element: <ProtectedRoute><Create /></ProtectedRoute> },
  ]);

  return routes;
}

export default AppRoutes;
