import { ReactComponent as DarkLogo } from '../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../assets/logo-dark.svg';
import { ReactComponent as UserIcon } from '../assets/userIcon.svg';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { useState } from 'react';

export default function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="h-16 border flex items-center justify-between px-10 py-4">
      <Link to="/">
        <LightLogo />
      </Link>
      <span>
        <IconButton>
          <LightModeOutlinedIcon sx={{ color: 'white' }} />
        </IconButton>
        <IconButton>
          <DarkModeOutlinedIcon sx={{ color: 'black' }} />
        </IconButton>
        <IconButton
          onClick={() => {
            setMenu(!menu);
          }}
        >
          <UserIcon />
        </IconButton>
        {menu === true ? (
          <div className="border flex flex-col gap-2 rounded-lg px-5 py-6 text-center absolute top-16 right-1">
            <p>Logout</p>
            <hr></hr>
            <Link to="/myPage">my Page</Link>
          </div>
        ) : null}
      </span>
    </div>
  );
}
