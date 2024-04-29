import React, { useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import LanguageSelector from '../../components/LanguageSelect';
import { CODE_SNIPPETS } from '../../const/LanguageOption';
import * as monaco from 'monaco-editor';
import { IdeEditor } from '../../components/IdeEditor';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';
import { ReactComponent as FolderIcon } from '../../assets/folder.svg';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheTheme } from '../../components/Theme';
import Console from '../../components/Console';
import { ButtonContainer, Container, CustomButton, FileListContainer } from './IdeStyles';

export default function IDE() {
  const { themeColor } = useTheTheme();
  const themeObject = {
    buttonBackground: themeColor === 'light' ? '#f4f4f4' : '#18293D',
    fileListBackground: themeColor === 'light' ? '#fffff' : '#243B56',
  };

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
  };
  return (
    <ThemeProvider theme={themeObject}>
      <Container>
        <ButtonContainer>
          <CustomButton className="bg-green-200 text-green-800 m-auto">
            <PlayArrowOutlinedIcon />
            RUN
          </CustomButton>
          <CustomButton className="bg-green-100 text-black mr-2">
            <LanguageSelector onSelectChange={onSelect} />
          </CustomButton>
          <CustomButton className="bg-green-500 text-white mr-2">저장</CustomButton>
        </ButtonContainer>
        <div className="flex">
          <div className="border h-screen w-max flex flex-col items-center">
            <IconButton>
              <FolderIcon />
            </IconButton>
            <IconButton>
              <Link to="/chat">
                <ChatIcon />
              </Link>
            </IconButton>
          </div>
          <FileListContainer>파일 목록</FileListContainer>
          <IdeEditor />
          <Console editorRef={editorRef} language={language} />
        </div>
      </Container>
    </ThemeProvider>
  );
}
