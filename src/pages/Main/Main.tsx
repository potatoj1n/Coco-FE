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

const Main = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: '내 이름',
      text: '안녕! 나는 잘 지내1. 너는 어때?',
      owner: 'mine',
    },
    {
      id: 2,
      username: '상대방 이름',
      text: '안녕하세요1, 어떻게 지내세요?',
      owner: 'other',
    },
    {
      id: 1,
      username: '내 이름',
      text: '안녕! 나는 잘 지내. 너는 어때?',
      owner: 'mine',
    },
    {
      id: 2,
      username: '상대방 이름',
      text: '안녕하세요, 어떻게 지내세요?',
      owner: 'other',
    },
    {
      id: 2,
      username: '상대방 이름',
      text: '안녕하세요, 어떻게 지내세요?',
      owner: 'other',
    },
    {
      id: 2,
      username: '상대방 이름',
      text: '안녕하세요, 어떻게 지내세요?',
      owner: 'other',
    },
    {
      id: 2,
      username: '상대방 이름',
      text: '안녕하세요, 어떻게 지내세요?',
      owner: 'other',
    },
    {
      id: 1,
      username: '내 이름',
      text: '안녕! 나는 잘 지내. 너는 어때?',
      owner: 'mine',
    },
    {
      id: 2,
      username: '상대방 이름',
      text: '코코다스팀의 코코 웹프로젝트 채팅방입니다. 다 같이 화이팅합시다! 프로젝트 잘 마무리해봐요. 오늘도 출석체크 잊지마시고 exp도 잊지마세요~ 입퇴실 체크는 필수~~',
      owner: 'other',
    },
    {
      id: 1,
      username: '내 이름',
      text: '안녕! 나는 잘 지내. 너는 어때?',
      owner: 'mine',
    }, // ... 퍼블리싱만
  ]);
  const [newMessage, setNewMessage] = useState<string>('');

  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelector, setLanguageSelector] = useState(false);
  const [showPjList, setshowPjList] = useState(false);

  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;
  const [showImage, setShowImage] = useState(false);
  const [clicked, setClicked] = useState(false); // 버튼 클릭 상태 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (!clicked) {
      setShowImage(true); // 이미지 표시 상태를 true로 설정
      setClicked(true); // 버튼이 클릭되었다고 상태 업데이트
      alert('출석하였습니다.'); // 사용자에게 알림 표시
      console.log('attend success');
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
              <Day>24</Day>
              <Month>|5|</Month>
            </Date>
            <div>
              <AttendButton onClick={handleButtonClick} disabled={clicked}>
                {clicked ? '출석 완료' : '출석하기'}
              </AttendButton>
              {showImage && <AttendanceImage src={attend} show={showImage} />}
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
              {messages.map(message =>
                message.owner === 'other' ? (
                  <MessageOther key={message.id}>
                    <UserContainer>
                      <UserIcon src={profileOther} />
                      <UserName>{message.username}</UserName>
                    </UserContainer>
                    <MessageOthertext>{message.text}</MessageOthertext>
                  </MessageOther>
                ) : (
                  <MessageMine key={message.id}>
                    <MessageMinetext>{message.text}</MessageMinetext>
                    <UserContainer>
                      <UserIcon src={profileMine} />
                    </UserContainer>
                  </MessageMine>
                ),
              )}
              <div ref={messagesEndRef} /> {/* 스크롤을 아래로 이동하기 위한 빈 div */}
            </Chatmain>
          </ChatContainer>
        </Maincontainer>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
