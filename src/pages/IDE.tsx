import React from 'react';
import IdeEditor from '../components/IdeEditor';
import { ReactComponent as ChatIcon } from '../assets/chat.svg';
import { ReactComponent as FolderIcon } from '../assets/folder.svg';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

export default function IDE() {
  return (
    <div className="IDE flex flex-col h-screen">
      <div className="border flex justify-between items-center">
        <button className="idebutton m-auto">RUN</button>
        <button className="idebutton">언어</button>
        <button className="idebutton mr-2">저장</button>
      </div>
      <div className="flex">
        <div className="border h-screen w-max flex flex-col items-center">
          <IconButton>
            <FolderIcon />
          </IconButton>
          <IconButton>
            <Link to="/chat">
              <ChatIcon />
            </Link>
          </IconButton>
        </div>
        <div className="border h-screen w-1/6">파일 목록</div>
        <IdeEditor />
      </div>
    </div>
  );
}
