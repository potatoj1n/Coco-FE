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

export default function Header() {
  const { themeColor, toggleTheme } = useTheme();
  const [menu, setMenu] = useState(false);

  return (
    <Container>
      <Link to="/">
        <LightLogo />
      </Link>
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
          <div className="border flex flex-col gap-2 rounded-lg px-5 py-6 text-center absolute top-16 right-1 ">
            <p>Logout</p>
            <hr></hr>
            <Link to="/myPage">my Page</Link>
          </div>
        ) : null}
      </span>
    </Container>
  );
}
