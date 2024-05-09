import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export interface SearchInputProps {
  show?: boolean;
}

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
  min-width: 150px;
  width: 13vw;
  flex-direction: column;
  align-items: center;
  position: fixed;
  border-right: 1px solid #d8dfe3;
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
  align-items: center;
  justify-content: center;
  display: flex;
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
export const FolderButton = styled.button`
  color: ${({ theme }) => theme.text};
  padding: 10px;
  padding-left: 20px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  transition:
    background-color 0.3s,
    color 0.3s;
  flex-direction: row;
  min-width: 150px;
  width: 13vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;

  margin-top: 10px;
  &:hover {
    background-color: rgba(118, 193, 175, 0.3);
  }
`;
export const ChatButton = styled(Link)`
  color: ${({ theme }) => theme.text};
  padding: 10px;
  padding-left: 14px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
  min-width: 150px;
  width: 13vw;
  flex-direction: row;
  display: flex;
  align-items: center;
  height: 40px;
  &:hover {
    background-color: rgba(118, 193, 175, 0.3);
  }
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
export const Iconchat = styled.img`
  width: 35px;
  height: 35px;
  margin-right: -6px;
`;

export const Menuname = styled.p`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 600;
  display: flex;
  flex-grow: 1;
  margin-left: 10px;
`;
export const Maincontainer = styled.div`
  width: calc(100vw - max(13vw, 150px));
  margin-left: max(13vw, 150px);
  display: grid;
  grid-template-columns: 1fr 0.8fr; /* 왼쪽 열은 1fr, 오른쪽 열은 0.5fr */
  grid-template-rows: repeat(2, 1fr); /* 두 개의 행을 동일한 비율로 설정 */
  gap: 5px;
  padding: 20px 20px 20px 20px;
  height: 100vh;
  position: fixed;
  justify-content: center;
  align-items: center;
  /* 미디어 쿼리를 사용하여 뷰포트 너비가 600px 이하일 때 반응형으로 변경 */
  @media (max-width: 700px) {
    grid-template-columns: 1fr; /* 한 열로 변경 */
    padding: 50px 20px;
    overflow: scroll;
  }
`;
export const Hicontainer = styled.div`
  background-color: ${({ theme }) => theme.HiColor};
  height: 300px;
  display: flex;
  width: 500px;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  padding: 50px 30px 30px 70px;
  border-radius: 16px;
  margin: 10px;
  align-self: center; // 그리드 셀 내 중앙 정렬
  justify-self: center; // 그리드 셀 내 중앙 정렬
`;

export const MainImg = styled.img`
  width: 250px;
  height: 170px;
  margin-top: 10px;
`;
export const Hione = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  color: black;
`;
export const Hitwo = styled.p`
  font-size: 20px;
  margin-top: 10px;
  font-style: normal;
  font-weight: 600;
  color: black;
`;

export const Attendancecontainer = styled.div`
  background-color: ${({ theme }) => theme.buttonColor};

  height: 300px;
  display: flex;
  width: 380px;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  border-radius: 16px;
  margin: 10px;
  align-items: center;
  align-self: center;
  justify-self: center;
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
  height: 160px;
  width: 160px;
  border-radius: 50%;
  position: relative; // AttendanceImage의 부모 요소가 됨
  z-index: 0; // z-index를 설정하여 다른 콘텐츠와의 층위를 조정
`;
export const Month = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 45px;
`;
export const Day = styled.p`
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: -30px;
  margin-top: 50px;
`;

export const AttendanceImage = styled.img<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
  height: 160px;
  width: 160px;
  position: absolute; // 스크롤에 따라 이동하지 않도록 위치 설정
  margin-top: -220px;
  margin-left: 20px;
  z-index: 1; // Date 위에 위치하기 위해 z-index 사용
`;

export const Pjcontainer = styled.div`
  display: flex;
  flex-direction: column;
  height: max(28vw, 250px);
  width: max(30vw, 100px);
  margin: 10px;
`;
export const ModifyPj = styled.p`
  color: ${({ theme }) => theme.text};
  margin-top: 25px;
  font-style: normal;
  font-weight: 600;
  margin-top: -20px;
  margin-left: 30px;
  align-self: center;
  justify-self: center;
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

export const ChatContainer = styled.div`
  flex-direction: column;
  height: max(28vw, 250px);
  width: max(35vw, 100px);
  margin: 10px;
  margin-left: -4.3vw;
  align-items: left;
  align-self: center;
  justify-self: center;
`;
export const Chatnav = styled.div`
  flex-direction: raw;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const Chatname = styled.p`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 600;
  display: flex;
  margin: 0 10px;
  flex-grow: 1;
`;
export const Chatmore = styled(Link)`
  color: ${({ theme }) => theme.text};
  font-style: normal;
  font-weight: 500;
  margin-top: 10px;
  margin-right: 10px;
  font-size: 8px;
`;

export const Chatmain = styled.div`
  border-top: 1px solid rgba(102, 102, 102, 0.6);
  border-bottom: 1px solid rgba(102, 102, 102, 0.6);
  height: max(18vw, 20px);
  width: max(35vw, 100px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 10px 0px 10px;
`;

export const UserName = styled.h1`
  font-size: 9px;
  margin-top: 0.6rem;
`;

export const UserIcon = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

export const MessageFlexContainer = styled.div`
  display: flex;
  flex-direction: row; // 아이템을 가로로 배열
  align-items: flex-end; // 아이템을 컨테이너의 하단에 정렬
  width: 100%;
`;

export const MessageOther = styled.div`
  align-self: flex-start;
  display: flex;
  margin: 4px 0px;
`;

export const MessageMine = styled(MessageOther)`
  align-self: flex-end;
`;

export const MessageMinetext = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid rgba(102, 102, 102, 0.6);
  background-color: #9be9a8;
  padding: 15px 20px;
  margin: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 13px;
  color: black;
  max-width: 26vw;
`;
export const MessageOthertext = styled(MessageMinetext)`
  background-color: #fff;
  margin-bottom: 28px;
`;
