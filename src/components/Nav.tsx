import { ReactComponent as DarkLogo } from '../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../assets/logo-dark.svg';
import { ReactComponent as UserIcon } from '../assets/userIcon.svg';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link, useLocation } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useTheTheme } from '../components/Theme';
import styled from 'styled-components';

const Container = styled.nav`
  height: 64px; // 16px * 4
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
`;

const Half = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
  padding: 10px 40px;
`;
const Half2 = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  height: 100%;
  padding: 10px 40px;
  background-color: ${({ theme }) => {
    const isMainPage = location.pathname === '/';
    return isMainPage && theme.themeColor === 'dark' ? 'transparent' : theme.lightBackground;
  }};
`;

const MenuContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.borderColor};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 1.25rem 1.5rem;
  text-align: center;
  position: absolute;
  top: 4rem;
  right: 0.25rem;
`;

export default function Header() {
  // const theme = useTheme();
  const { themeColor, toggleTheme } = useTheTheme();
  const [menu, setMenu] = useState(false);
  const location = useLocation();

  return (
    <Container>
      <Half>
        <Link to="/">{themeColor === 'light' ? <LightLogo /> : <DarkLogo />}</Link>
      </Half>
      <Half2>
        <span style={{ marginLeft: 'auto' }}>
          <IconButton onClick={toggleTheme}>
            {themeColor === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
          </IconButton>
          {location.pathname !== '/' && (
            <IconButton
              onClick={() => {
                setMenu(!menu);
              }}
            >
              <UserIcon />
            </IconButton>
          )}
          {menu === true ? (
            <MenuContainer>
              <p>Logout</p>
              <hr></hr>
              <Link to="/myPage">my Page</Link>
            </MenuContainer>
          ) : null}
        </span>
      </Half2>
    </Container>
  );
}
