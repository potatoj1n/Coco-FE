import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import * as monaco from 'monaco-editor';
import { IdeEditor } from '../../components/IDE/IdeEditor';
import { useTheTheme } from '../../components/Theme';
import Console from '../../components/IDE/Console';
import FileList from '../../components/IDE/FileTree/FileList';
import { ReactComponent as ChatlightIcon } from '../../assets/chatlight.svg';
import { ReactComponent as FolderlightIcon } from '../../assets/folderlight.svg';
import { ReactComponent as FolderDarkIcon } from '../../assets/folderdark.svg';
import { ReactComponent as ChatDarkIcon } from '../../assets/chatdark.svg';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import { Button, IconButton } from '@mui/material';
import { ButtonContainer, Container, CustomButton, IconContainer, FileListContainer, IDEContainer } from './IdeStyles';
import useLanguageStore from '../../state/IDE/IdeStore';
import { executeCode, saveCode } from '../../components/IDE/CodeApi';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import useProjectStore, { useFolderStore } from '../../state/IDE/ProjectState';

export default function IDE() {
  const { themeColor } = useTheTheme();
  const themeObject = {
    buttonBackground: themeColor === 'light' ? '#f4f4f4' : '#18293D',
    fileListBackground: themeColor === 'light' ? '#fffff' : '#243B56',
    ideBackground: themeColor === 'light' ? '#fffff' : '#243B56',
  };

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const language = useLanguageStore(state => state.language);
  const { output, isLoading, isError, openSnackbar, snackbarMessage, consoleOpen, setConsoleOpen } = useConsoleStore();

  //save 버튼
  const handleSave = () => {
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    saveCode(language, sourceCode)
      .then(() => console.log('저장되었습니다.'))
      .catch(error => console.error('저장에 실패했습니다.', error));
  };
  //단축키 이벤트 핸들러
  useEffect(() => {
    const handleSaveShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        handleSave();
      }
    };

    document.addEventListener('keydown', handleSaveShortcut);

    return () => {
      document.removeEventListener('keydown', handleSaveShortcut);
    };
  }, []);
  //Run 버튼
  const runCode = async () => {
    setConsoleOpen(true);
    if (!editorRef.current) return;

    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      useConsoleStore.setState({ isLoading: true });
      const { run: result } = await executeCode(language, sourceCode);
      useConsoleStore.setState({
        output: result.output.split('\n'),
        isError: !!result.stderr,
        snackbarMessage: '',
        openSnackbar: false,
      });
    } catch (error) {
      console.log(error);
      useConsoleStore.setState({ snackbarMessage: '코드 실행에 실패했습니다.', openSnackbar: true });
    } finally {
      useConsoleStore.setState({ isLoading: false });
    }
  };

  return (
    <ThemeProvider theme={themeObject}>
      <Container>
        <ButtonContainer>
          <Button
            color="success"
            variant="contained"
            sx={{
              margin: 'auto',
              backgroundColor: '#41C464',
              '&:hover': {
                backgroundColor: '#5BC48E',
                color: '#11724F',
              },
            }}
            onClick={runCode}
          >
            <PlayArrowOutlinedIcon />
            RUN
          </Button>
          <CustomButton>{language}</CustomButton>
          <Button
            color="success"
            variant="contained"
            sx={{
              backgroundColor: '#23BE87',
              '&:hover': {
                backgroundColor: '#5BC48E',
                color: '#11724F',
              },
            }}
            onClick={handleSave}
          >
            SAVE
          </Button>
        </ButtonContainer>
        <div className="flex ">
          <IconContainer>
            <IconButton>{themeColor === 'light' ? <FolderlightIcon /> : <FolderDarkIcon />}</IconButton>
            <IconButton>
              <Link to="/chat">{themeColor === 'light' ? <ChatlightIcon /> : <ChatDarkIcon />}</Link>
            </IconButton>
          </IconContainer>
          <FileListContainer>
            <FileList />
          </FileListContainer>
          <IDEContainer>
            <IdeEditor />
            <Console
              editorRef={editorRef}
              language={language}
              output={output}
              isLoading={isLoading}
              isError={isError}
              openSnackbar={openSnackbar}
              snackbarMessage={snackbarMessage}
              consoleOpen={consoleOpen}
              setConsoleOpen={setConsoleOpen}
            />
          </IDEContainer>
        </div>
      </Container>
    </ThemeProvider>
  );
}
