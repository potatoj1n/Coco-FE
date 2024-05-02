import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const lightTheme = {
  text: '#000000', // 라이트 모드 폰트 색상
  borderColor: '#eef1f3', // 라이트 모드 보더 색상
  background: '#fff',
  buttonColor: '#AAEAD3',
  HiColor: '#23BE87',
  attend: '#ffffff',
  attendbutton: '#28B381',
};

export const darkTheme = {
  text: '#fff', // 다크 모드 폰트 색상
  borderColor: '#54595b', // 다크 모드 보더 색상
  background: '#243B56',
  buttonColor: '#23BE87',
  HiColor: '#AAEAD3',
  attend: '#23BE87',
  attendbutton: '#ffffff',
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
  width: calc(100vw - max(12vw, 130px));
  border-left: 1px solid #d8dfe3;
  margin-top: -158px;
  margin-left: max(12vw, 130px);

  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 두 개의 열을 동일한 비율로 설정 */
  grid-template-rows: repeat(2, 1fr); /* 두 개의 행을 동일한 비율로 설정 */
  gap: 20px; /* 그리드 간격 설정 */
  padding: 20px; /* 내부 여백 */
  height: 100vh; /* 부모 컨테이너 높이 설정 */
`;
export const Hicontainer = styled.div`
  background-color: ${({ theme }) => theme.HiColor};
  height: max(26vw, 250px);
  display: flex;
  width: max(40vw, 350px);
  min-width: 130px;
  flex-direction: column;
  align-items: left;
  padding: 30px;
  border-radius: 16px;
  margin: 10px;
`;

export const MainImg = styled.img`
  width: max(25vw, 200px);
  height: 170px;
  margin-top: 10px;
`;
export const Hione = styled.p`
  font-size: max(2.1vw, 16px);
  font-style: normal;
  font-weight: 600;
  color: black;
`;
export const Hitwo = styled.p`
  font-size: max(2vw, 14px);
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  color: black;
`;

export const Attendancecontainer = styled.div`
  background-color: ${({ theme }) => theme.buttonColor};

  height: max(26vw, 250px);
  display: flex;
  width: max(30vw, 100px);
  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: 30px;
  border-radius: 16px;
  margin: 10px;
  align-items: center;
`;
export const AttendButton = styled.button`
  background-color: ${({ theme }) => theme.attendbutton};
  color: ${({ theme }) => theme.attend};
  width: 200px;
  height: 40px;
  font-size: 14px;
  border-radius: 5px;
  margin: 20px 0 0 0;
`;
export const Date = styled.div`
  background-color: white;
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;
export const Month = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;
export const Day = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const Pjcontainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: -50px 20px 0 20px;
`;
export const ModifyPj = styled.p`
  color: black;
  margin-top: 25px;
  font-style: normal;
  font-weight: 500;
  margin-top: -20px;
  margin-left: 30px;
`;

export const ModifyPjBtn = styled(Link)`
background-color: white;
padding: 20px;
border-radius: 5px;
transition: background-color 0.3s;
border: 1px solid #A9B5BC;
margin-top: 10px;
display: flex;
justify-content: center;
align-items: center;
width: 130px;
height: 160px;
&:hover {
  background-color: #d8dfe3;`;

export const ModifyIcon = styled.img`
  width: 60px;
  height: 60px;
`;

export const ChatContainer = styled.div``;
