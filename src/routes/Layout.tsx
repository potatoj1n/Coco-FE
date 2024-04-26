import { useTheme } from '../components/Theme';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

export const Layout = () => {
  const { themeColor } = useTheme();

  const style = {
    backgroundColor: themeColor === 'light' ? '#ffffff' : '#1C2631',
    color: themeColor === 'light' ? '#000000' : '#ffffff',
  };

  return (
    <div style={style}>
      <Nav />
      <Outlet />
    </div>
  );
};
