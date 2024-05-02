import { createBrowserRouter } from 'react-router-dom';
import Main from '../pages/Main/Main';
import Login from '../pages/Login/Login';
import SignUp from '../pages/SignUp/SignUp';
import MyPage from '../pages/Mypage/MyPage';
import IDE from '../pages/IDE/IDE';
import Chat from '../pages/Chat/Chat';
import { Layout } from './Layout';
import FirstMain from '../pages/FirstMain/FirstMain';

const Routers = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <FirstMain /> },
      { path: '/main', element: <Main /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <SignUp /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/chat', element: <Chat /> },
      { path: '/ide', element: <IDE /> },
    ],
  },
]);

export default Routers;
