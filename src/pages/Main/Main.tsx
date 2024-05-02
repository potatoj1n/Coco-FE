import React, { useState } from 'react';
import LanguageSelector from '../../components/LanguageSelect';
import { lightTheme, darkTheme, FolderButton, Icon, ChatButton, Sidecontainer, PjButton, Plus } from './MainStyles';
import { ThemeProvider } from 'styled-components';
import useLanguageStore from '../../store/IDE/IdeStore';
import { useTheTheme } from '../../components/Theme';
import folderLight from '../../assets/folderlight.svg';
import folderDark from '../../assets/folderdark.svg';
import chatLight from '../../assets/chatlight.svg';
import chatDark from '../../assets/chatdark.svg';
import { Link } from 'react-router-dom';

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
    </ThemeProvider>
  );
};

export default Main;
