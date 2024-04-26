import React, { ReactNode, createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext({
  themeColor: 'light', // 기본값
  toggleTheme: () => {
    console.warn('toggleTheme is not yet implemented');
  }, // 기본 동작
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeColor, setTheme] = useState('light');
  const themeObject = {
    backgroundColor: themeColor === 'light' ? '#ffffff' : '#1C2631',
    borderColor: themeColor === 'light' ? '#D8DFE3' : '#ffffff',
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
