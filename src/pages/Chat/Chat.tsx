import React, { useState, useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import profileOther from '../../assets/profileOther.svg';
import profileMine from '../../assets/profileMine.svg';
import Chatsend from '../../assets/chatsend.svg';
import Chatsearch from '../../assets/chatsearch.svg';
import MessageTrash from '../../assets/messageTrash.svg';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';

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

const Chat = () => {
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
    }, // ... 퍼블리싱만
  ]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { themeColor } = useTheTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // 메시지 리스트의 끝을 가리킬 ref 생성

  // 메시지 배열이 변경될 때마다 실행되어 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = { id: Date.now(), username: '내 이름', text: newMessage, owner: 'mine' };
      setMessages([...messages, newMsg]);
      // 메시지 배열의 끝에 새 메시지를 추가합니다.
      setNewMessage('');
      // 입력 후 메시지 리스트의 끝으로 스크롤합니다.
    }
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
        <Link to="/ide">
          <IconButton>
            <FolderIcon />
          </IconButton>
        </Link>
        <Link to="/chat">
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Link>
      </StyledDiv>
      <MessageContainer>
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
              <MessageFlexContainer>
                <MessageMinetext>{message.text}</MessageMinetext>
                <MyMessageTrash src={MessageTrash} />
              </MessageFlexContainer>
              <UserContainer>
                <UserIcon src={profileMine} />
              </UserContainer>
            </MessageMine>
          ),
        )}
        <div ref={messagesEndRef} /> {/* 스크롤을 아래로 이동하기 위한 빈 div */}
      </MessageContainer>
      <ChatContainer>
        <ChatInputContainer>
          <ChatInput
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
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
