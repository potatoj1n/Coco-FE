import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import profileOther from '../../assets/profileOther.svg';
import profileMine from '../../assets/profileMine.svg';
import Chatsend from '../../assets/chatsend.svg';
import Chatsearch from '../../assets/chatsearch.svg';
import { useTheTheme } from '../../components/Theme';
import {
  lightTheme,
  darkTheme,
  MessageContainer,
  UserContainer,
  MessageOther,
  UserIcon,
  UserName,
  MessageMine,
  MessageText,
  ChatContainer,
  ChatInputContainer,
  ChatInput,
  SendButton,
  SearchButton,
  SearchInput,
} from './ChatStyles';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: '상대방 이름',
      text: '안녕하세요, 어떻게 지내세요?',
      owner: 'other',
    },
    {
      id: 2,
      username: '내 이름',
      text: '안녕! 나는 잘 지내. 너는 어때?',
      owner: 'mine',
    }, // ... 퍼블리싱만
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [searchMessage, setSearchMessage] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;

  const handleMessageChange = (e: any) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    const newMsg = { id: Date.now(), username: '내 이름', text: newMessage, owner: 'mine' };
    setMessages([...messages, newMsg]);
    setNewMessage('');
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
      <MessageContainer>
        {messages.map(message =>
          message.owner === 'other' ? (
            <MessageOther key={message.id}>
              <UserContainer>
                <UserIcon src={profileOther} />
                <UserName>{message.username}</UserName>
              </UserContainer>
              <MessageText>{message.text}</MessageText>
            </MessageOther>
          ) : (
            <MessageMine key={message.id}>
              <UserContainer>
                <UserIcon src={profileMine} />
              </UserContainer>
              <MessageText>{message.text}</MessageText>
            </MessageMine>
          ),
        )}
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
          <SendButton onClick={handleSendMessage}>
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
