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
import { formatKoreanTime } from '../../components/Timestamp';
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
  Timestampmine,
  Timestamp,
} from './ChatStyles';
import axios from 'axios';

const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

const Chat = () => {
  const { messages, addMessage, deleteMessage, deleteAllMessages } = useChatStore();

  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { themeColor } = useTheTheme();
  const { memberId } = useAuthStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);

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

  // 스크롤을 메시지 인덱스에 따라 중앙으로 이동시키는 함수
  const scrollToMessage = useCallback(
    (index: any) => {
      const element = messageRefs.current[index];
      const container = chatContainerRef.current;

      if (element && container) {
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const centerPosition = containerRect.height / 2 - elementRect.height / 2;
        const scrollPosition = element.offsetTop - container.offsetTop - centerPosition;

        // 스크롤이 경계를 넘지 않도록 조정
        const maxScroll = container.scrollHeight - container.clientHeight;
        const newScrollPosition = Math.min(Math.max(0, scrollPosition), maxScroll);

        container.scrollTo({ top: newScrollPosition, behavior: 'smooth' });
      }
    },
    [messageRefs, chatContainerRef],
  );
  // 다음 검색 결과로 이동
  const handleSearchDown = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(prevIndex => prevIndex - 1);
    } else {
      alert('더 이상의 검색 결과가 없습니다.');
    }
  }, [activeIndex]);

  // 이전 검색 결과로 이동
  const handleSearchUp = useCallback(() => {
    if (activeIndex < searchResults.length - 1) {
      setActiveIndex(prevIndex => prevIndex + 1);
    } else {
      alert('더 이상의 검색 결과가 없습니다.');
    }
  }, [activeIndex, searchResults.length]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setActiveIndex(0);
      setTimeout(() => scrollToMessage(0), 100); // DOM 업데이트 후 스크롤 조정
    }
  }, [searchResults]);

  //채팅 검색하는 함수
  const handleSearch = useCallback(
    (searchTerm: any) => {
      const filteredResults = messages
        .filter(msg => msg.message.toLowerCase().includes(searchTerm.toLowerCase()))
        .reverse();
      setSearchResults(filteredResults);
      setActiveIndex(0); // 검색 결과의 첫 번째 항목을 활성화

      if (filteredResults.length > 0) {
        setTimeout(() => scrollToMessage(0), 100); // 비동기적으로 스크롤 이동
        console.log('search:', filteredResults);
      } else {
        alert('검색 결과가 없습니다.');
      }
    },
    [messages, setSearchResults, setActiveIndex, scrollToMessage],
  );

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < searchResults.length) {
      console.log('Current active message:', searchResults[activeIndex]);
      scrollToMessage(activeIndex);
    }
  }, [activeIndex, scrollToMessage]);

  // 새 메시지 수신 시 스크롤을 아래로
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  //useEffect(() => {
  // 메시지 목록이 변경될 때 스크롤 복원
  //  restoreScrollPosition();
  //}, [messages.length]);

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
            if (chatContainerRef.current) {
              const scrollPosition = chatContainerRef.current.scrollTop;
              deleteAllMessages(); // 이전 메시지 삭제
              chatContainerRef.current.scrollTop = scrollPosition;
            }
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

  // useEffect(() => {
  //   scrollToBottom();
  // }, []);

  //const scrollToBottom = useCallback(() => {
  //  if (messagesEndRef.current) {
  //   messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  //  }
  //}, []);

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
                  fontWeight: searchResults.includes(msg) ? 'bold' : 'normal', // 모든 검색 결과 강조
                  textDecoration: searchResults.includes(msg) ? 'underline' : 'none',
                }}
              >
                {msg.memberId == memberId ? (
                  <MessageFlexContainer>
                    <MessageMine>
                      <Timestampmine>
                        <div>{formatKoreanTime(msg.createdAt).date}</div>
                        <div>{formatKoreanTime(msg.createdAt).time}</div>
                      </Timestampmine>
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
                      <Timestamp>
                        <div>{formatKoreanTime(msg.createdAt).date}</div>
                        <div>{formatKoreanTime(msg.createdAt).time}</div>
                      </Timestamp>
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
