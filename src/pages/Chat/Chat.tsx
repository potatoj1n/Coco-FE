import React, { useState, useEffect, useRef, useCallback } from 'react';
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

// 웹소켓 주소 설정 (예: ws://localhost:4000)
const WEBSOCKET_URL = 'ws://13.124.84.248:8080/topic?memberId=1';

const Chat = () => {
  const [message, setMessages] = useState([
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
  const { messages, addMessage, deleteMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState<string>('');
  const [isLoading, setLoading] = useState(true);
  const [searchMessage, setSearchMessage] = useState<string>('');
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const { themeColor } = useTheTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // 메시지 리스트의 끝을 가리킬 ref 생성

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const websocket = useRef<WebSocket | null>(null);
  const connectWebSocket = useCallback(() => {
    // 웹소켓 연결
    websocket.current = new WebSocket(WEBSOCKET_URL);

    websocket.current.onopen = () => {
      console.log('WebSocket connection established');
      // 초기 메시지 로드 요청
      if (websocket.current) {
        websocket.current.send(JSON.stringify({ type: 'load_initial_messages' }));
      }
    };

    // 메시지 수신
    websocket.current.onmessage = (event: any) => {
      const message = JSON.parse(event.data);
      if (message.type === 'initial_messages') {
        // 메시지 배열이 변경될 때마다 실행되어 스크롤을 맨 아래로 이동
        message.data.reverse().forEach((msg: any) => addMessage(msg));
        setLoading(false);
      } else {
        addMessage(message);
      }
      scrollToBottom();
    };

    websocket.current.onerror = (error: any) => {
      console.error('WebSocket error:', error);
    };

    websocket.current.onclose = () => {
      console.log('WebSocket connection closed');
      setTimeout(() => {
        console.log('Attempting to reconnect...');
        connectWebSocket();
      }, 5000); // Try to reconnect every 5 seconds
    };
  }, [addMessage, scrollToBottom]);

  useEffect(() => {
    connectWebSocket();

    // 컴포넌트 언마운트 시 웹소켓 연결 해제
    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, [connectWebSocket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  function createMessage(id: number, username: string, text: string, owner: 'mine' | 'other'): Message {
    return { id, username, text, owner };
  }

  // 메시지 전송
  const handleSendMessage = useCallback(() => {
    if (newMessage.trim() && websocket.current) {
      const message = {
        id: Date.now(), // Ideally the server should assign ids
        username: '내 이름',
        text: newMessage,
        owner: 'mine' as 'mine' | 'other', // Type assertion here
      };
      websocket.current.send(JSON.stringify(message));
      addMessage(message);
      setNewMessage('');
    }
  }, [newMessage, addMessage]);

  // 메시지 삭제 요청
  const handleDeleteMessage = useCallback(
    (id: any) => {
      if (websocket.current) {
        websocket.current.send(JSON.stringify({ type: 'delete', id }));
        deleteMessage(id);
      }
    },
    [deleteMessage],
  );

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
        <IconButton>{themeColor === 'light' ? <FolderLightIcon /> : <FolderDarkIcon />}</IconButton>
        <IconButton>
          <Link to="/chat">{themeColor === 'light' ? <ChatLightIcon /> : <ChatDarkIcon />}</Link>
        </IconButton>
      </StyledDiv>
      {isLoading && <p>Loading messages...</p>}
      <MessageContainer>
        <div style={{ flexGrow: 1 }}></div>
        {messages.map(message => (
          <div key={message.id}>
            {message.owner === 'other' ? (
              <MessageOther>
                <UserContainer>
                  <UserIcon src={profileOther} />
                  <UserName>{message.username}</UserName>
                </UserContainer>
                <MessageOthertext>{message.text}</MessageOthertext>
              </MessageOther>
            ) : (
              <MessageMine>
                <MessageFlexContainer>
                  <MessageMinetext>{message.text}</MessageMinetext>
                  <MyMessageTrash onClick={() => handleDeleteMessage(message.id)} src={MessageTrash} />
                </MessageFlexContainer>
                <UserContainer>
                  <UserIcon src={profileMine} />
                </UserContainer>
              </MessageMine>
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
