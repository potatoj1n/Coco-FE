import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const lightTheme = {
  text: '#000000', // 라이트 모드 폰트 색상
  borderColor: '#eef1f3', // 라이트 모드 보더 색상
  background: '#fff',
  buttonColor: '#AAEAD3',
};

export const darkTheme = {
  text: '#fff', // 다크 모드 폰트 색상
  borderColor: '#54595b', // 다크 모드 보더 색상
  background: '#243B56',
  buttonColor: '#23BE87',
};

// 회전 애니메이션 정의
const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Sidecontainer = styled.div`
  height: 100%;
  display: flex;
  left: 0;
  width: 12vw;
  min-width: 130px;
  border-right: 1px solid #d8dfe3;
  flex-direction: column;
  align-items: center;
`;

// "+" 부분을 스타일링하는 컴포넌트
export const Plus = styled.span`
  display: inline-block;
  transition: transform 0.3s;
`;

export const PjButton = styled.button`
  background-color: ${({ theme }) => theme.buttonColor};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;

  border: 1px solid ${({ theme }) => theme.borderColor};
  border-radius: 5px;
  margin-top: 10px;
  transition: background-color 0.3s;
  width: 11vw;
  min-width: 120px;
  &:hover {
    background-color: #76c1af; /* 호버 시 배경색 변경 */

    ${Plus} {
      animation: ${rotateAnimation} 0.3s linear forwards;
    }
  }
`;
export const ChatButton = styled(Link)`
color: ${({ theme }) => theme.text};
padding: 10px;
font-size: 15px;
font-style: normal;
font-weight: 600;
border: none;
border-radius: 5px;
transition: background-color 0.3s;
width: 11vw;
flex-direction: raw;
min-width: 120px;
&:hover {
  background-color: #d8dfe3;`;
export const FolderButton = styled(ChatButton)``;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
