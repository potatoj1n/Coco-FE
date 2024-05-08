import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext({
  themeColor: 'light', // 기본값
  toggleTheme: () => {
    console.warn('toggleTheme is not yet implemented');
  }, // 기본 동작
});

export const useTheTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  //로컬스토리지에서 테마 색상 읽어오기
  const initialTheme = localStorage.getItem('themeColor') || 'light';
  const [themeColor, setTheme] = useState(initialTheme);
  const themeObject = {
    backgroundColor: themeColor === 'light' ? '#ffffff' : '#1C2631',
    borderColor: themeColor === 'light' ? '#D8DFE3' : '#ffffff',
    lightColor: '#ffffff', // 밝은 배경색
    darkColor: '#1C2631', // 어두운 배경색
    themeColor: themeColor, //현재 배경색 light 또는 dark
  };
  const toggleTheme = () => {
    const newTheme = themeColor === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('themeColor', newTheme);
  };

  return (
    <StyledThemeProvider theme={themeObject}>
      <ThemeContext.Provider value={{ themeColor, toggleTheme }}>{children}</ThemeContext.Provider>
    </StyledThemeProvider>
  );
};
