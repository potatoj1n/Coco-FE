import React, { useEffect, useRef, useState } from 'react';
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
import { saveCode } from '../../components/IDE/ProjectApi';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import useProjectStore from '../../state/IDE/ProjectState';
const userName = 'coco';
const userPassword = 'coco';
const Token = btoa(`${userName}:${userPassword}`);

export default function IDE() {
  const consoleRef = useRef<any>(null);
  // const [socket, setSocket] = useState<WebSocket | null>(null);
  // const webSocketRef = useRef<WebSocket | null>(null);
  // const [sessionId, setSessionId] = useState<string>('');
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  const { themeColor } = useTheTheme();
  const themeObject = {
    buttonBackground: themeColor === 'light' ? '#f4f4f4' : '#18293D',
    fileListBackground: themeColor === 'light' ? '#fffff' : '#243B56',
    ideBackground: themeColor === 'light' ? '#fffff' : '#243B56',
  };
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const language = useLanguageStore(state => state.language);
  const { output, isLoading, isError, openSnackbar, snackbarMessage, consoleOpen, setConsoleOpen, setOutput } =
    useConsoleStore();
  const { selectedProjectId, selectedFolderId, selectedFileId, selectedFileContent } = useProjectStore(state => ({
    selectedProjectId: state.selectedProjectId,
    selectedFolderId: state.selectedFolderId,
    selectedFileId: state.selectedFileId,
    selectedFileContent: state.selectedFileContent,
  }));

  const connectWebSocket = async (): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const newSocket = new WebSocket(`ws://43.201.76.117:8080/execute`);

      newSocket.onopen = () => {
        console.log('WebSocket connection established');
      };

      newSocket.onmessage = event => {
        const message = event.data;
        console.log('Received message:', message);
        if (message.startsWith('SessionId:')) {
          const newSessionId = message.split(':')[1];
          console.log('Session ID received: ' + newSessionId);
          setSessionId(newSessionId);
          resolve(newSessionId);
        } else {
          setOutput(prevOutput => (prevOutput ? [...prevOutput, message] : [message]));
        }
      };

      newSocket.onerror = error => {
        console.error('WebSocket error:', error);
        reject(error);
      };

      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
      };

      setSocket(newSocket);
      if (consoleRef.current) {
        consoleRef.current.connectWebSocket(newSocket);
      }
    });
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const handleSave = async () => {
    const sourceCode = selectedFileContent;

    try {
      await saveCode(selectedProjectId, selectedFolderId, selectedFileId, sourceCode);
      console.log('코드가 성공적으로 저장되었습니다.');
    } catch (error) {
      console.error('코드 저장에 실패했습니다.', error);
    }
  };

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

  const runCode = async () => {
    setConsoleOpen(true);

    try {
      useConsoleStore.setState({ isLoading: true });

      if (!socket || socket.readyState === WebSocket.CLOSED) {
        const newSessionId = await connectWebSocket();
        setSessionId(newSessionId);

        // const data = {
        //   command: 'run',
        //   sessionId: newSessionId,
        // };
        const fixedFilePath = '1/';
        const data = { command: 'run', filePath: fixedFilePath, sessionId: sessionId };
        const response = await fetch('http://43.201.76.117:8080/run-command', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${Token}`,
          },
          credentials: 'include',
          body: JSON.stringify(data),
        });

        const text = await response.text();
        console.log('Received from server:', text);
        setOutput(prevOutput => (prevOutput ? [...prevOutput, text] : [text]));
      }
    } catch (error) {
      console.error('Error:', error);
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
              ref={consoleRef}
              editorRef={editorRef}
              language={language}
              output={output}
              isLoading={isLoading}
              isError={isError}
              openSnackbar={openSnackbar}
              snackbarMessage={snackbarMessage}
              consoleOpen={consoleOpen}
              setConsoleOpen={setConsoleOpen}
              setOutput={(newOutput: string[]) => setOutput(() => newOutput)}
            />
          </IDEContainer>
        </div>
      </Container>
    </ThemeProvider>
  );
}
