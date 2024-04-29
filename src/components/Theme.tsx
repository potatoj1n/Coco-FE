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
  const [themeColor, setTheme] = useState('light');
  const themeObject = {
    backgroundColor: themeColor === 'light' ? '#ffffff' : '#1C2631',
    borderColor: themeColor === 'light' ? '#D8DFE3' : '#ffffff',
    lightBackground: '#ffffff', // 밝은 배경색
    darkBackground: '#1C2631', // 어두운 배경색
  };
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <StyledThemeProvider theme={themeObject}>
      <ThemeContext.Provider value={{ themeColor, toggleTheme }}>{children}</ThemeContext.Provider>
    </StyledThemeProvider>
  );
};
