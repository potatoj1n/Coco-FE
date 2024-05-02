import React, { useState } from 'react';
import LanguageSelector from '../../components/LanguageSelect';
import {
  lightTheme,
  darkTheme,
  Container,
  FolderButton,
  Icon,
  ChatButton,
  Sidecontainer,
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
} from './MainStyles';
import { ThemeProvider } from 'styled-components';
import useLanguageStore from '../../store/IDE/IdeStore';
import { useTheTheme } from '../../components/Theme';
import folderLight from '../../assets/folderlight.svg';
import folderDark from '../../assets/folderdark.svg';
import chatLight from '../../assets/chatlight.svg';
import chatDark from '../../assets/chatdark.svg';
import mainimg from '../../assets/mainimg.svg';

const Main = () => {
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelector, setLanguageSelector] = useState(false);
  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;

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

          <FolderButton to="/ide">
            <Icon src={themeColor === 'light' ? folderLight : folderDark} />
            프로젝트
          </FolderButton>
          <ChatButton to="/chat">
            <Icon src={themeColor === 'light' ? chatLight : chatDark} />
            chat
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
            <AttendButton>출석하기</AttendButton>
          </Attendancecontainer>
          <Pjcontainer></Pjcontainer>
          <ChatContainer></ChatContainer>
        </Maincontainer>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
