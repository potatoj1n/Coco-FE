import React, { useState } from 'react';
import LanguageSelector from '../../components/LanguageSelect';
import useLanguageStore from '../../store/IdeStore';
import { lightTheme, darkTheme, Sidecontainer, StyledButton, Plus } from './MainStyles';
import { ThemeProvider } from 'styled-components';
import { useTheTheme } from '../../components/Theme';

const Main = () => {
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelector, setLanguageSelector] = useState(false);
  const { themeColor } = useTheTheme();
  const currentTheme = themeColor === 'light' ? lightTheme : darkTheme;

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };
  const handleButtonClick = () => {
    setLanguageSelector(!languageSelector);
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <Sidecontainer>
        <div>
          <StyledButton onClick={handleButtonClick}>
            <Plus>+</Plus> 프로젝트 생성
          </StyledButton>
          {languageSelector ? <LanguageSelector onSelectChange={onSelect} /> : null}
        </div>
      </Sidecontainer>
    </ThemeProvider>
  );
};

export default Main;
