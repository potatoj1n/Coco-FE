import React, { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';

import { ThemeProvider } from 'styled-components';
import profileOther from '../../assets/profileOther.svg';
import profileMine from '../../assets/profileMine.svg';
import Chatsend from '../../assets/chatsend.svg';
import Chatsearch from '../../assets/chatsearch.svg';
import MessageTrash from '../../assets/messageTrash.svg';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ReactComponent as ChatLightIcon } from '../../assets/chatlight.svg';
import { ReactComponent as FolderLightIcon } from '../../assets/folderlight.svg';
import { ReactComponent as FolderDarkIcon } from '../../assets/folderdark.svg';
import { ReactComponent as ChatDarkIcon } from '../../assets/chatdark.svg';
import useChatStore, { Message } from '../../state/Chat/ChatStore';

import {
  lightTheme,
  darkTheme,
  MessageContainer,
  MessageFlexContainer,
  UserContainer,
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

  // 메시지 리스트의 끝을 가리킬 ref 생성
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const stompClient = useRef<Client | null>(null);

  const memberId = String(1);
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
    // 비동기 작업을 실행하는 함수
    const connectStomp = async () => {
      try {
        const socket = new SockJS('http://43.201.76.117:8080/ws');
        stompClient.current = new Client({
          webSocketFactory: () => socket,
          onConnect: () => {
            console.log('Connected');
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
        body: JSON.stringify({ memberId, message: newMessage }),
      });
      setNewMessage('');
      console.log('send');
    }
  };
  // 메시지 삭제 요청
  const handleDeleteMessage = (memberId: string) => {
    deleteMessage(memberId);
  };

  const handleSearch = () => {
    if (searchMessage.trim() !== '') {
      console.log('Search query:', searchMessage);
      setSearchMessage('');
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
      <StyledDiv>
        <IconButton>
          <Link to="/ide/1">{themeColor === 'light' ? <FolderLightIcon /> : <FolderDarkIcon />}</Link>
        </IconButton>
        <IconButton>
          <Link to="/chat">{themeColor === 'light' ? <ChatLightIcon /> : <ChatDarkIcon />}</Link>
        </IconButton>
      </StyledDiv>
      {isLoading && <p>Loading messages...</p>}
      <MessageContainer>
        <div style={{ flexGrow: 1 }}></div>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.memberId === memberId ? (
              <MessageMine>
                <UserContainer>
                  <UserIcon src={profileMine} />
                  <UserName>Me</UserName>
                </UserContainer>
                <MessageMinetext>{msg.message}</MessageMinetext>
                <MyMessageTrash onClick={() => handleDeleteMessage} src={MessageTrash} />
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
        <SearchButton onClick={toggleSearch}>
          <img src={Chatsearch} />
        </SearchButton>
        {showSearch && (
          <SearchInput
            show={showSearch}
            value={searchMessage}
            type="text"
            onChange={e => setSearchMessage(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleSearch()}
            placeholder="검색"
          />
        )}
      </ChatContainer>
    </ThemeProvider>
  );
};

export default Chat;
