import React, { useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import * as monaco from 'monaco-editor';
import { IdeEditor } from '../../components/IdeEditor';
import { ReactComponent as ChatlightIcon } from '../../assets/chatlight.svg';
import { ReactComponent as FolderlightIcon } from '../../assets/folderlight.svg';
import { ReactComponent as FolderDarkIcon } from '../../assets/folderdark.svg';
import { ReactComponent as ChatDarkIcon } from '../../assets/chatdark.svg';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheTheme } from '../../components/Theme';
import Console from '../../components/Console';
import { ButtonContainer, Container, CustomButton, FileListContainer, IDEContainer } from './IdeStyles';
import useLanguageStore from '../../store/IdeStore';
import { executeCode } from '../../components/api';

export default function IDE() {
  const { themeColor } = useTheTheme();
  const themeObject = {
    buttonBackground: themeColor === 'light' ? '#f4f4f4' : '#18293D',
    fileListBackground: themeColor === 'light' ? '#fffff' : '#243B56',
    ideBackground: themeColor === 'light' ? '#fffff' : '#243B56',
  };

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const language = useLanguageStore(state => state.language);

  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const runCode = async () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split('\n'));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      setSnackbarMessage('Unable to run code');
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={themeObject}>
      <Container>
        <ButtonContainer>
          <CustomButton className="bg-green-200 text-green-800 m-auto hover:text-green-500" onClick={runCode}>
            <PlayArrowOutlinedIcon />
            RUN
          </CustomButton>
          <CustomButton className="bg-green-100 text-black mr-2">{language}</CustomButton>
          <CustomButton className="bg-green-500 text-white ">저장</CustomButton>
        </ButtonContainer>
        <div className="flex">
          <div className="border h-screen w-max flex flex-col items-center">
            <IconButton>{themeColor === 'light' ? <FolderlightIcon /> : <FolderDarkIcon />}</IconButton>
            <IconButton>
              <Link to="/chat">{themeColor === 'light' ? <ChatlightIcon /> : <ChatDarkIcon />}</Link>
            </IconButton>
          </div>
          <FileListContainer>파일 목록</FileListContainer>
          <IDEContainer>
            <IdeEditor />
            <Console editorRef={editorRef} language={language} />
          </IDEContainer>
        </div>
      </Container>
    </ThemeProvider>
  );
}
