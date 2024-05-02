import React, { useState } from 'react';
import LanguageSelector from '../../components/LanguageSelect';
import useLanguageStore from '../../store/IDE/IdeStore';
import { Sidecontainer } from './MainStyles';
const Main = () => {
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelector, setLanguageSelector] = useState(false);

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };
  const onClose = () => {
    setLanguageSelector(false);
  };

  return (
    <Sidecontainer>
      <div>
        <button onClick={() => setLanguageSelector(!languageSelector)}>프로젝트 생성</button>
        {languageSelector && <LanguageSelector onSelectChange={onSelect} onClose={onClose} />}
      </div>
    </Sidecontainer>
  );
};

export default Main;
