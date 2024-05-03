import React, { useState } from 'react';
import { styled } from 'styled-components';
import folderLight from '../assets/folderlight.svg';
import messageTrash from '../assets/messageTrash.svg';
import { ThemeProvider } from 'styled-components';
import { useTheTheme } from '../components/Theme';

interface PjListProps {
  onClose: () => void;
}
const lightTheme = {
  text: '#000000', // 라이트 모드 폰트 색상
  filter: 'none',
};

const darkTheme = {
  text: '#fff', // 다크 모드 폰트 색상
  filter: 'invert(100%)', // 다크 모드에서는 색상 반전
};

const Container = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.backgroundColor};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 300px;
  width: 50vw;
`;
const Myproject = styled.h1`
  width: 90%;
  display: flexed;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 10px;
`;
const CloseModal = styled.h1`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin: 5px 20px 10px 0px;
`;
const Listcontainer = styled.div`
  height: 300px;
  width: 90%;
`;
const Pjcontainer = styled.div`
  display: flex;
  flex-direction: raw;
  justify-content: space-between;
`;
const Icon = styled.img`
  filter: ${({ theme }) => theme.filter};
  margin: 10px;
`;
const Foldername = styled.h1`
  margin: 12px 0 0 0;
  flex-grow: 1;
`;

const PjList: React.FC<PjListProps> = ({ onClose }) => {
  const [projects, setprojects] = useState([
    {
      id: 1,
      name: 'cocowebproject',
    },
    {
      id: 1,
      name: 'cocowebproject',
    },
    {
      id: 1,
      name: 'cocowebproject',
    },
    {
      id: 1,
      name: 'cocowebproject',
    },
    {
      id: 1,
      name: 'cocowebproject',
    },
    {
      id: 1,
      name: 'cocowebproject',
    }, // ... 퍼블리싱만
  ]);
  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;
  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <CloseModal onClick={onClose}>x</CloseModal>
        <Myproject>내 프로젝트</Myproject>
        <Listcontainer>
          <Pjcontainer>
            <Icon src={folderLight} />
            <Foldername>cocowebproject</Foldername>
            <Icon src={messageTrash} />
          </Pjcontainer>
        </Listcontainer>
      </Container>
    </ThemeProvider>
  );
};

export default PjList;
