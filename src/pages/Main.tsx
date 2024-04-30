import React, { useState } from 'react';
import LanguageSelector from '../components/LanguageSelect';
import useLanguageStore from '../store/IdeStore';

const Main = () => {
  const [language, setLanguage] = useLanguageStore(state => [state.language, state.setLanguage]);
  const [languageSelctor, setLanguageSelector] = useState(false);

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  return (
    <div>
      <button onClick={() => setLanguageSelector(!languageSelctor)}>프로젝트 생성</button>
      {languageSelctor === true ? <LanguageSelector onSelectChange={onSelect} /> : null}
    </div>
  );
};

export default Main;
