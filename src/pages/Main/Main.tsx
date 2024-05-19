import React, { useState, useEffect, useRef } from 'react';
import LanguageSelector from '../../components/IDE/LanguageSelect';
import PjList from '../../components/PjList';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import address from '../../components/Address';

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
  AttendCalender,
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
import useAuthStore from '../../state/AuthStore';
interface Attendance {
  date: string;
  present: boolean;
}
const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);
const Main = () => {
  const { memberId, nickname } = useAuthStore();
  const stompClient = useRef<Client | null>(null);
  const { messages, addMessage, deleteMessage, deleteAllMessages } = useChatStore();

  const [newMessage, setNewMessage] = useState<string>('');
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelector, setLanguageSelector] = useState(false);
  const [showPjList, setshowPjList] = useState(false);

  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;
  const [showImage, setShowImage] = useState(false);
  const [clicked, setClicked] = useState(false); // 버튼 클릭 상태 추가
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentDate, setCurrentDate] = useState<{ day: number; month: number }>();
  const [isLoading, setLoading] = useState(true);

  const handleButtonClick = () => {
    if (!clicked) {
      setShowImage(true); // 이미지 표시 상태를 true로 설정
      setClicked(true); // 버튼이 클릭되었다고 상태 업데이트
      alert('출석하였습니다.'); // 사용자에게 알림 표시
      console.log('attend success');
      sendAttendance(memberId);
    }
  };
  useEffect(() => {
    // 비동기 작업을 실행하는 함수
    const connectStomp = async () => {
      try {
        const socket = new SockJS('http://43.201.76.117:8080/ws');
        stompClient.current = new Client({
          webSocketFactory: () => socket,
          onConnect: () => {
            console.log('Connected', memberId);
            deleteAllMessages(); // 이전 메시지 삭제
            loadInitialMessages(); // 초기 데이터 로드를 여기로 옮깁니다
            // 실시간 채팅 구독 설정 및 초기 메시지 불러오기
            // 먼저 기존 데이터를 불러옵니다
            // 실시간 메시지를 받기 위한 구독 설정
            stompClient.current?.subscribe('/topic/chat', message => {
              console.log('Received message:', message);
              const receivedMessage = JSON.parse(message.body);
              if (receivedMessage.message && receivedMessage.memberId && receivedMessage.nickname) {
                addMessage(receivedMessage);
                console.log('Message added:', receivedMessage);
              } else {
                console.error('Invalid message format:', receivedMessage);
              }
            });
          },
          onStompError: frame => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
          },
        });
        stompClient.current.activate();
      } catch (error) {
        console.error('Connection error:', error);
      }
    };
    // 채팅 데이터를 불러오는 함수
    const loadInitialMessages = async () => {
      try {
        // 기존 채팅 데이터 요청 (토큰 없이)
        const response = await axios.get(
          `http://43.201.76.117:8080/messages`,
          // 데이터를 성공적으로 받아왔다면 화면에 표시하는 로직
          { headers: { Authorization: `Basic ${Token}` } },
        );

        response.data.forEach((msg: any) => {
          addMessage(msg);
        });
        console.log('Get messages:', response.data);
        setLoading(false); // 로딩 상태 업데이트
      } catch (error) {
        console.error('Failed to load initial messages:', error);
      }
    };
    // 비동기 함수 호출
    connectStomp();

    // 클린업 함수에서는 비동기 로직을 포함하지 않고, 단지 필요한 자원 정리만 수행
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
        console.log('Disconnected'); // 비동기 작업 없이 STOMP 클라이언트 비활성화
      }
    };
  }, [deleteAllMessages]); // 의존성 배열, 필요에 따라 변수 포함

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

          <ChatButton to={`/chat/${memberId}`}>
            <Iconchat src={themeColor === 'light' ? chatLight : chatDark} />
            <Menuname>chat</Menuname>
          </ChatButton>
          <ChatButton to={`/mypage/${memberId}`}>
            <Iconmypage src={themeColor === 'light' ? mypageIconlight : mypageIcondark} />
            <Menuname>my page</Menuname>
          </ChatButton>
        </Sidecontainer>
        <Maincontainer>
          <Hicontainer>
            <Hione>어서오세요 {nickname} 님,</Hione>
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
            <AttendCalender to={`/mypage/${memberId}`}>출석현황</AttendCalender>
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
              <Chatmore to={`/chat/${memberId}`}> 더보기... </Chatmore>
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
