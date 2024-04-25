import { createBrowserRouter } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Chat from './pages/Chat';
import IDE from './pages/IDE';
import React from 'react';

const Routers = createBrowserRouter([
  { path: '/', element: <Main /> },
  { path: '/login', element: <Login /> },
  { path: '/signUp', element: <SignUp /> },
  { path: '/myPage', element: <MyPage /> },
  { path: '/chat', element: <Chat /> },
  { path: '/ide', element: <IDE /> },
]);

export default Routers;
