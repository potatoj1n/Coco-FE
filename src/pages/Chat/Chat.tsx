import React, { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { useLocation } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import profileOther from '../../assets/profileOther.svg';
import profileMine from '../../assets/profileMine.svg';
import Chatsend from '../../assets/chatsend.svg';
import Chatsearch from '../../assets/chatsearch.svg';
import messageTrash from '../../assets/messageTrash.svg';
import pointerup from '../../assets/pointerup.svg';
import searchDown from '../../assets/searchDown.svg';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ReactComponent as ChatLightIcon } from '../../assets/chatlight.svg';
import { ReactComponent as FolderLightIcon } from '../../assets/folderlight.svg';
import { ReactComponent as FolderDarkIcon } from '../../assets/folderdark.svg';
import { ReactComponent as ChatDarkIcon } from '../../assets/chatdark.svg';
import useChatStore, { Message } from '../../state/Chat/ChatStore';
import useAuthStore from '../../state/AuthStore';

import {
  lightTheme,
  SearchUp,
  SearchDown,
  darkTheme,
  Container,
  MessageContainer,
  MessageFlexContainer,
  UserContainer,
  MyUserContainer,
  MessageOther,
  UserIcon,
  UserName,
  MessageMine,
  MessageOthertext,
  MessageMinetext,
  ChatContainer,
  ChatInputContainer,
  MyMessageTrash,
  ChatInput,
  SendButton,
  SearchButton,
  SearchInput,
  StyledDiv,
  Pointerimg,
  Timestamp,
} from './ChatStyles';
import axios from 'axios';

const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

const Chat = () => {
  const { messages, addMessage, deleteMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { themeColor } = useTheTheme();
  const { memberId } = useAuthStore();

  const location = useLocation();
  // 메시지 리스트의 끝을 가리킬 ref 생성
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0); // 스크롤 위치 저장을 위한 ref
  const [messageCount, setMessageCount] = useState(messages.length); // 메시지 개수 상태 추가
  const messageRefs = useRef<(HTMLElement | null)[]>([]); // 각 메시지에 대한 참조를 저장할 배열

  const stompClient = useRef<Client | null>(null);
  // 검색 결과와 현재 선택된 인덱스 상태
  // 상태 변수 선언 부분
  const [searchResults, setSearchResults] = useState<Message[]>([]);

  const [activeIndex, setActiveIndex] = useState(-1);

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
  useEffect(() => {
    if (messageCount < messages.length) {
      // 메시지 개수가 증가했을 때만 스크롤을 아래로 이동
      scrollToBottom();
    }
    setMessageCount(messages.length); // 메시지 개수 업데이트
  }, [messages.length]);

  //내 채팅 삭제하는 함수
  const handleDeleteMessage = async (messageId: any) => {
    if (window.confirm(`메세지를 삭제할건가요?`)) {
      saveScrollPosition();
      try {
        // 서버에 삭제 요청을 보냄
        await axios.delete(`http://43.201.76.117:8080/message?messageId=${messageId}`, {
          headers: { Authorization: `Basic ${Token}` },
        });
        // UI에서 메시지 삭제
        deleteMessage(messageId);
        console.log('Message deleted:', messageId);
        setTimeout(restoreScrollPosition, 0);
      } catch (error) {
        console.error('Failed to delete message:', messageId, error);
      }
      restoreScrollPosition(); // 삭제 후 스크롤 위치 복원
    }
  };

  //채팅 검색하는 함수
  const handleSearch = async (searchMessage: string) => {
    if (searchMessage.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    if (searchMessage.trim() !== '') {
      try {
        const response = await axios.get(`http://43.201.76.117:8080/message?search=${searchMessage}`, {
          headers: { Authorization: `Basic ${Token}` },
          params: { search: searchMessage }, // 서버에 검색어 전달
        });
        const searchResults: Message[] = response.data;

        if (searchResults.length === 0) {
          searchResults.forEach(result => {
            console.log(result); // 각 검색 결과의 상세 정보 확인
          });
          alert('해당 단어를 찾을 수 없습니다.');
        } else {
          setSearchResults(searchResults);
          setActiveIndex(0); // 첫 번째 검색 결과로 초기 설정
          scrollToMessage(0); // 첫 번째 검색 결과로 스크롤
        }
      } catch (error) {
        console.error('Failed to search messages:', error);
      }
    }
  };

  const scrollToMessage = (index: number) => {
    const element = messageRefs.current[index];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  useEffect(() => {
    // 메시지 목록이 변경될 때 스크롤 복원
    restoreScrollPosition();
  }, [messages.length]);
  // 스크롤 위치를 저장하고 복원하는 함수
  const saveScrollPosition = () => {
    if (messagesEndRef.current) {
      lastScrollTop.current = messagesEndRef.current.scrollTop;
    }
  };

  const restoreScrollPosition = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = lastScrollTop.current;
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
            // 실시간 채팅 구독 설정 및 초기 메시지 불러오기
            // 먼저 기존 데이터를 불러옵니다
            loadInitialMessages().then(() => {
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

    // 비동기 함수 호출
    connectStomp();

    // 클린업 함수에서는 비동기 로직을 포함하지 않고, 단지 필요한 자원 정리만 수행
    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate();
        console.log('Disconnected'); // 비동기 작업 없이 STOMP 클라이언트 비활성화
      }
    };
  }, []); // 의존성 배열, 필요에 따라 변수 포함

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;

  // 메시지 전송
  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      stompClient.current?.publish({
        destination: '/app/message',
        body: JSON.stringify({ memberId: memberId, message: newMessage, nickname: 'test' }),
      });
      setNewMessage('');
      console.log('send');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  const toggleSearch = () => {
    console.log('Toggle Search:', !showSearch); // Debugging
    setShowSearch(!showSearch);
  };
  function formatKoreanTime(isoString: any) {
    const date = new Date(isoString);
    // 한국 시간대로 설정 (UTC+9)
    const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    // AM/PM, 시간, 분 형식으로 변환
    return koreanTime.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  }
  // 위/아래 버튼 클릭 핸들러
  const handleSearchDown = () => {
    if (activeIndex < searchResults.length - 1) {
      setActiveIndex((prev: any) => prev + 1);
      scrollToMessage(activeIndex + 1);
    } else {
      alert('더 이상 메시지가 없습니다.');
    }
  };

  const handleSearchUp = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev: any) => prev - 1);
      scrollToMessage(activeIndex - 1);
    } else {
      alert('더 이상 메시지가 없습니다.');
    }
  };
  return (
    <ThemeProvider theme={currentTheme}>
      <Container>
        <StyledDiv>
          <IconButton>
            <Link to={`/ide/${memberId}`}>{themeColor === 'light' ? <FolderLightIcon /> : <FolderDarkIcon />}</Link>
          </IconButton>
          <IconButton>{themeColor === 'light' ? <ChatLightIcon /> : <ChatDarkIcon />}</IconButton>
        </StyledDiv>
        {isLoading && <p>Loading messages...</p>}
        <MessageContainer>
          <div style={{ flexGrow: 1 }}></div>
          {messages
            .filter(msg => !msg.isDeleted)
            .map((msg, index) => (
              <div
                key={index}
                ref={(el: any) => (messageRefs.current[index] = el)}
                style={{
                  fontWeight: searchResults.includes(msg) && index === activeIndex ? 'bold' : 'normal',
                  textDecoration: searchResults.includes(msg) && index === activeIndex ? 'underline' : 'none',
                }}
              >
                {msg.memberId == memberId ? (
                  <MessageFlexContainer>
                    <MessageMine>
                      <Timestamp>{formatKoreanTime(msg.createdAt)}</Timestamp>
                      <MessageMinetext>{msg.message}</MessageMinetext>
                      <MyMessageTrash onClick={() => handleDeleteMessage(msg.chatId)} src={messageTrash} />
                      <MyUserContainer>
                        <UserIcon src={profileMine} />
                      </MyUserContainer>
                    </MessageMine>
                  </MessageFlexContainer>
                ) : (
                  <MessageFlexContainer>
                    <MessageOther>
                      <UserContainer>
                        <UserIcon src={profileOther} />
                        <UserName>{msg.nickname}</UserName>
                      </UserContainer>
                      <MessageOthertext>{msg.message}</MessageOthertext>
                      <Timestamp>{formatKoreanTime(msg.createdAt)}</Timestamp>
                    </MessageOther>
                  </MessageFlexContainer>
                )}
              </div>
            ))}
          <div ref={messagesEndRef} /> {/* 스크롤을 아래로 이동하기 위한 빈 div */}
        </MessageContainer>
        <ChatContainer>
          <ChatInputContainer>
            <ChatInput
              type="text"
              value={newMessage}
              onChange={(e: any) => setNewMessage(e.target.value)}
              placeholder="메시지를 입력하세요"
              onKeyPress={handleKeyPress}
            />
            <SendButton type="button" onClick={handleSendMessage}>
              <img src={Chatsend} />
            </SendButton>
          </ChatInputContainer>
        </ChatContainer>
        <SearchButton onClick={toggleSearch}>
          <img src={Chatsearch} />
        </SearchButton>
        {showSearch && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchInput
              show={showSearch}
              value={searchMessage}
              type="text"
              onChange={(e: any) => setSearchMessage(e.target.value)}
              onKeyPress={(e: any) => e.key === 'Enter' && handleSearch(searchMessage)}
              placeholder="검색"
            />
            <SearchDown onClick={handleSearchDown}>
              <Pointerimg src={searchDown} />
            </SearchDown>
            <SearchUp onClick={handleSearchUp}>
              <Pointerimg src={pointerup} />
            </SearchUp>
          </div>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Chat;
