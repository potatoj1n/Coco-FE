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
} from './MainStyles';
import { ThemeProvider } from 'styled-components';
import useLanguageStore from '../../store/IDE/IdeStore';
import { useTheTheme } from '../../components/Theme';
import folderLight from '../../assets/folderlight.svg';
import folderDark from '../../assets/folderdark.svg';
import chatLight from '../../assets/chatlight.svg';
import chatDark from '../../assets/chatdark.svg';
import mainimg from '../../assets/mainimg.svg';
import modifypj from '../../assets/modifypj.svg';
import attend from '../../assets/attend.svg';

const Main = () => {
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelector, setLanguageSelector] = useState(false);
  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;
  const [showImage, setShowImage] = useState(false);
  const [clicked, setClicked] = useState(false); // 버튼 클릭 상태 추가

  const handleButtonClick = () => {
    if (!clicked) {
      setShowImage(true); // 이미지 표시 상태를 true로 설정
      setClicked(true); // 버튼이 클릭되었다고 상태 업데이트
      alert('출석하였습니다.'); // 사용자에게 알림 표시
      console.log('attend success');
    }
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

          <FolderButton to="/ide">
            <Icon src={themeColor === 'light' ? folderLight : folderDark} />
            <Menuname>프로젝트</Menuname>
          </FolderButton>
          <ChatButton to="/chat">
            <Icon src={themeColor === 'light' ? chatLight : chatDark} />
            <Menuname>chat</Menuname>
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
              <Icon src={themeColor === 'light' ? chatLight : chatDark} />
              <Chatname> Chat </Chatname>
              <Chatmore to="/chat"> 더보기... </Chatmore>
            </Chatnav>
            <Chatmain></Chatmain>
          </ChatContainer>
        </Maincontainer>
      </Container>
    </ThemeProvider>
  );
};

export default Main;
