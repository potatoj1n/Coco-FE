import React, { useState, useEffect, useRef } from 'react';
import LanguageSelector from '../../components/IDE/LanguageSelect';
import PjList from '../../components/PjList';
import {
  lightTheme,
  darkTheme,
  Container,
  FolderButton,
  Icon,
  Iconchat,
  Iconmypage,
  ChatButton,
  Sidecontainer,
  Menuname,
  Maincontainer,
  Hicontainer,
  Attendancecontainer,
  Pjcontainer,
  ChatContainer,
  PjButton,
  Plus,
  Hione,
  Hitwo,
  MainImg,
  Date,
  Day,
  Month,
  AttendButton,
  AttendanceImage,
  ModifyPj,
  ModifyPjBtn,
  ModifyIcon,
  Chatnav,
  Chatmain,
  Chatname,
  Chatmore,
  MessageOther,
  UserContainer,
  UserIcon,
  UserName,
  MessageOthertext,
  MessageMine,
  MessageMinetext,
} from './MainStyles';
import { ThemeProvider } from 'styled-components';
import useLanguageStore from '../../state/IDE/IdeStore';
import { useTheTheme } from '../../components/Theme';
import folderLight from '../../assets/folderlight.svg';
import folderDark from '../../assets/folderdark.svg';
import chatLight from '../../assets/chatlight.svg';
import chatDark from '../../assets/chatdark.svg';
import mainimg from '../../assets/mainimg.svg';
import modifypj from '../../assets/modifypj.svg';
import attend from '../../assets/attend.svg';
import profileOther from '../../assets/profileOther.svg';
import profileMine from '../../assets/profileMine.svg';
import mypageIconlight from '../../assets/mypageIconlight.svg';
import mypageIcondark from '../../assets/mypageIcondark.svg';
import { getCurrentDate } from '../../components/Date';
import useChatStore from '../../state/Chat/ChatStore';
import axios from 'axios';
const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);
const Main = () => {
  const messages = useChatStore(state => state.messages);

  const [newMessage, setNewMessage] = useState<string>('');
  const memberId = String(1);
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelector, setLanguageSelector] = useState(false);
  const [showPjList, setshowPjList] = useState(false);

  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;
  const [showImage, setShowImage] = useState(false);
  const [clicked, setClicked] = useState(false); // 버튼 클릭 상태 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState<{ day: number; month: number }>();

  const handleButtonClick = () => {
    if (!clicked) {
      setShowImage(true); // 이미지 표시 상태를 true로 설정
      setClicked(true); // 버튼이 클릭되었다고 상태 업데이트
      alert('출석하였습니다.'); // 사용자에게 알림 표시
      console.log('attend success');
      sendAttendance(memberId);
    }
  };
  // 메시지 배열이 변경될 때마다 실행되어 스크롤을 맨 아래로 이동
  useEffect(() => {
    const chatContainer = messagesEndRef.current?.parentElement; // Chatmain 컨테이너를 가져옴
    if (chatContainer) {
      // 최하단으로 스크롤
      chatContainer.scrollTo({
        top: chatContainer.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };
  const togglePJList = () => {
    setshowPjList(!showPjList);
    console.log('Current showPjList before toggle:', showPjList);
  };

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const onClose = () => {
    setLanguageSelector(false);
  };

  useEffect(() => {
    const date = getCurrentDate();
    setCurrentDate(date);
  }, []);

  const sendAttendance = async (memberId: any) => {
    try {
      const response = await axios.post(
        'http://43.201.76.117:8080/api/attend',
        {
          memberId: memberId,
        },
        {
          headers: { Authorization: `Basic ${Token}` },
        },
      );
      console.log('Attendance recorded:', response.data);
    } catch (error: any) {
      if (error.response) {
        // 서버에서 응답을 받았지만, 오류 응답이 발생한 경우
        console.error('Failed to record attendance:', error.response.status, error.response.data);
      } else if (error.request) {
        // 요청이 이루어졌지만 응답을 받지 못한 경우
        console.error('No response received:', error.request);
      } else {
        // 요청 설정 중에 문제가 발생한 경우
        console.error('Error setting up request:', error.message);
      }
    }
  };
  useEffect(() => {
    console.log('Messages updated:', messages);
  }, [messages]);
  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <Sidecontainer>
          <div>
            <PjButton onClick={() => setLanguageSelector(!languageSelector)}>
              <Plus>+</Plus> 프로젝트 생성
            </PjButton>
            {languageSelector && <LanguageSelector onSelectChange={onSelect} onClose={onClose} />}
          </div>
          <div>
            <FolderButton onClick={togglePJList}>
              <Icon src={themeColor === 'light' ? folderLight : folderDark} />
              <Menuname>프로젝트</Menuname>
            </FolderButton>
            {showPjList && <PjList onClose={() => setshowPjList(false)} />}
          </div>

          <ChatButton to="/chat">
            <Iconchat src={themeColor === 'light' ? chatLight : chatDark} />
            <Menuname>chat</Menuname>
          </ChatButton>
          <ChatButton to="/mypage">
            <Iconmypage src={themeColor === 'light' ? mypageIconlight : mypageIcondark} />
            <Menuname>my page</Menuname>
          </ChatButton>
        </Sidecontainer>
        <Maincontainer>
          <Hicontainer>
            <Hione>어서오세요 내 닉네임 님,</Hione>
            <Hitwo>오늘 하루도 힘내세요!</Hitwo>
            <MainImg src={mainimg} />
          </Hicontainer>
          <Attendancecontainer>
            <Date>
              <Day>{currentDate?.day}</Day>
              <Month>|DAY|</Month>
            </Date>
            <div>
              <AttendButton onClick={handleButtonClick} disabled={clicked}>
                {clicked ? '출석 완료' : '출석하기'}
              </AttendButton>
              <AttendanceImage $show={showImage} src={attend} />
            </div>
          </Attendancecontainer>
          <Pjcontainer>
            <Icon src={themeColor === 'light' ? folderLight : folderDark} />
            <ModifyPj>수정 중인 프로젝트</ModifyPj>
            <ModifyPjBtn to="/ide">
              <ModifyIcon src={modifypj} />
            </ModifyPjBtn>
          </Pjcontainer>
          <ChatContainer>
            <Chatnav>
              <Iconchat src={themeColor === 'light' ? chatLight : chatDark} />
              <Chatname> Chat </Chatname>
              <Chatmore to="/chat"> 더보기... </Chatmore>
            </Chatnav>
            <Chatmain>
              <div style={{ flexGrow: 1 }}></div>
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg.memberId == memberId ? (
                    <MessageMine>
                      <MessageMinetext>{msg.message}</MessageMinetext>
                      <UserContainer>
                        <UserIcon src={profileMine} />
                      </UserContainer>
                    </MessageMine>
                  ) : (
                    <MessageOther>
                      <UserContainer>
                        <UserIcon src={profileOther} />
                        <UserName>{msg.nickname}</UserName>
                      </UserContainer>
                      <MessageOthertext>{msg.message}</MessageOthertext>
                      <UserName>{msg.createdAt}</UserName>
                    </MessageOther>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} /> {/* 스크롤을 아래로 이동하기 위한 빈 div */}
            </Chatmain>
          </ChatContainer>
        </Maincontainer>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
