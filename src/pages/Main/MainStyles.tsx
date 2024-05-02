import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const lightTheme = {
  text: '#000000', // 라이트 모드 폰트 색상
  borderColor: '#eef1f3', // 라이트 모드 보더 색상
  background: '#fff',
  buttonColor: '#AAEAD3',
  HiColor: '#23BE87',
};

export const darkTheme = {
  text: '#fff', // 다크 모드 폰트 색상
  borderColor: '#54595b', // 다크 모드 보더 색상
  background: '#243B56',
  buttonColor: '#23BE87',
  HiColor: '#AAEAD3',
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
export const Container = styled.div``;
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

export const Maincontainer = styled.div`
  height: 100vh;
  display: flex;
  width: calc(100vw - max(12vw, 130px));
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin-top: -158px;
  margin-left: max(12vw, 130px);
`;
export const Hicontainer = styled.div`
  background-color: ${({ theme }) => theme.HiColor};
  height: 280px;
  display: flex;
  width: max(40vw, 130px);
  min-width: 130px;
  flex-direction: column;
  align-items: left;
  padding: 25px;
  border-radius: 16px;
  margin: 10px;
`;

export const MainImg = styled.img`
  width: 300px;
  height: 170px;
  margin-top: 10px;
`;
export const Hione = styled.p`
  font-size: 30px;
  font-style: normal;
  font-weight: 600;
`;
export const Hitwo = styled.p`
  font-size: 25px;
  margin-top: 5px;
  font-style: normal;
  font-weight: 600;
`;

export const Attendancecontainer = styled.div``;
export const Pjcontainer = styled.div``;
export const ChatContainer = styled.div``;
