import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import folderLight from '../assets/folderlight.svg';
import messageTrash from '../assets/messageTrash.svg';
import { ThemeProvider } from 'styled-components';
import { useTheTheme } from '../components/Theme';
import ReactDOM from 'react-dom';
import { Container, Overlay } from './ModalOverlay';

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

const Myproject = styled.h1`
  width: 90%;
  display: flexed;
  border-bottom: 1px solid ${({ theme }) => theme.text};
  padding: 10px;
  color: ${({ theme }) => theme.text};
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
`;
const CloseModal = styled.h1`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  margin: 5px 20px 10px 0px;
  color: ${({ theme }) => theme.text};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
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
  margin: 14px 0 0 0;
  flex-grow: 1;
  color: ${({ theme }) => theme.text};
  font-family: 'Pretendard', sans-serif;
  font-style: normal;
  font-weight: 500;
`;

const modalRoot =
  document.getElementById('modal-root') ||
  (function () {
    const div = document.createElement('div');
    div.id = 'modal-root';
    document.body.appendChild(div);
    return div;
  })();

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
  const [closing, setClosing] = useState(false);
  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 300);
  };

  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;
  return ReactDOM.createPortal(
    <ThemeProvider theme={currentTheme}>
      <Overlay closing={closing}>
        <Container onClick={e => e.stopPropagation()} closing={closing}>
          <CloseModal onClick={handleClose}>x</CloseModal>
          <Myproject>내 프로젝트</Myproject>
          <Listcontainer>
            <Pjcontainer>
              <Icon src={folderLight} />
              <Foldername>cocowebproject</Foldername>
              <Icon src={messageTrash} />
            </Pjcontainer>
          </Listcontainer>
        </Container>
      </Overlay>
    </ThemeProvider>,
    modalRoot,
  );
};

export default PjList;
