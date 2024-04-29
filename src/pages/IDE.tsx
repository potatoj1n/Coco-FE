import React from 'react';
import { IdeEditor } from '../components/IdeEditor';
import { ReactComponent as ChatIcon } from '../assets/chat.svg';
import { ReactComponent as FolderIcon } from '../assets/folder.svg';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { ThemeProvider, styled } from 'styled-components';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { useTheme } from '../components/Theme';
const Container = styled.div`
  height: screen;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundColor};
`;
const Button = styled.div`
  border: none;
  border-radius: 8px;
  padding: 5px 23px;
`;
const ButtonContainer = styled.div`
  background-color: ${props => props.theme.buttonBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid ${props => props.theme.border};
`;
const FileListContainer = styled.div`
  background-color: ${props => props.theme.fileListBackground};
  padding: 10px;
  width: 20%;
  border-left: 0.5px solid ${props => props.theme.border};
  border-right: 0.5px solid ${props => props.theme.border};
`;

export default function IDE() {
  const { themeColor } = useTheme();
  const themeObject = {
    buttonBackground: themeColor === 'light' ? '#f4f4f4' : '#18293D',
    fileListBackground: themeColor === 'light' ? '#fffff' : '#243B56',
  };

  return (
    <ThemeProvider theme={themeObject}>
      <Container>
        <ButtonContainer>
          <Button className="bg-green-200 text-green-800 m-auto">
            <PlayArrowOutlinedIcon />
            RUN
          </Button>
          <Button className="bg-green-100 text-black mr-2">언어</Button>
          <Button className="bg-green-500 text-white mr-2">저장</Button>
        </ButtonContainer>
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
          <FileListContainer>파일 목록</FileListContainer>
          <IdeEditor />
        </div>
      </Container>
    </ThemeProvider>
  );
}
