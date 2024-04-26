import { ReactComponent as DarkLogo } from '../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../assets/logo-dark.svg';
import { ReactComponent as UserIcon } from '../assets/userIcon.svg';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '../components/Theme';
import styled from 'styled-components';

const Container = styled.div`
  height: 64px; // 16px * 4
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px; // px-10 py-4
  border-bottom: 1px solid ${({ theme }) => theme.borderColor};
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
  const { themeColor, toggleTheme } = useTheme();
  const [menu, setMenu] = useState(false);

  return (
    <Container>
      <Link to="/">{themeColor === 'light' ? <LightLogo /> : <DarkLogo />}</Link>
      <span>
        <IconButton onClick={toggleTheme}>
          {themeColor === 'light' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <UserIcon />
        </IconButton>
        {menu === true ? (
          <MenuContainer>
            <p>Logout</p>
            <hr></hr>
            <Link to="/myPage">my Page</Link>
          </MenuContainer>
        ) : null}
      </span>
    </Container>
  );
}
