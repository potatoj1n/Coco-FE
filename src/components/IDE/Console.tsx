import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import { ButtonWrapper, ConsoleButton, ConsoleWrapper } from './IdeStyle';
import { useTheTheme } from '../Theme';
import { ThemeProvider } from 'styled-components';

interface Props {
  editorRef: React.MutableRefObject<any>;
  language: string;
  output: string[] | null;
  isLoading: boolean;
  isError: boolean;
  openSnackbar: boolean;
  snackbarMessage: string;
  consoleOpen: boolean;
  setConsoleOpen: (consoleOpen: boolean) => void;
}

const Console = forwardRef((props: Props, ref) => {
  const { themeColor } = useTheTheme();
  const themeObject = {
    ButtonWrapperBackground: themeColor === 'light' ? '#ffffff' : '#011627',
  };
  const { output, setOutput, isError, openSnackbar, snackbarMessage, setOpenSnackbar, consoleOpen, setConsoleOpen } =
    useConsoleStore();
  const [sessionId, setSessionId] = useState<string>('');
  const [inputDisabled, setInputDisabled] = useState<boolean>(false);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useImperativeHandle(ref, () => ({
    connectWebSocket,
  }));

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const closeConsole = () => {
    setConsoleOpen(!consoleOpen);
  };
  const connectWebSocket = async () => {
    try {
      const newSocket = new WebSocket('ws://3.37.87.232:8080/execute');
      newSocket.onopen = () => {
        console.log('WebSocket connection opened');
        if (inputDisabled) {
          enableInput();
        }
      };

      newSocket.onmessage = event => {
        console.log('Received from server:', event.data);
        if (event.data.startsWith('SessionId:')) {
          setSessionId(event.data.split(':')[1]);
        } else if (event.data === 'InputStreamClosed') {
          console.log('Input stream closed by server.');
          disableInput();
          newSocket.close();
        }
        setOutput((prevOutput: string[] | null) => {
          if (prevOutput !== null) {
            return [...prevOutput, event.data];
          } else {
            return [event.data];
          }
        });
      };

      newSocket.onerror = error => {
        console.error('WebSocket error:', error);
      };

      newSocket.onclose = () => {
        console.log('WebSocket connection closed');
        disableInput();
      };

      setSocket(newSocket);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputLine = event.currentTarget.innerText.trim();
      if (socket && sessionId) {
        socket.send(JSON.stringify({ command: 'input', data: inputLine, sessionId }));
        setOutput((prevOutput: string[] | null) => {
          if (prevOutput !== null) {
            return [...prevOutput, inputLine];
          } else {
            return [inputLine];
          }
        });
        event.currentTarget.innerText = '';
      } else {
        console.error('WebSocket is not connected or sessionId is missing.');
      }
    }
  };

  const disableInput = () => {
    setInputDisabled(true);
  };

  const enableInput = () => {
    setInputDisabled(false);
  };

  useEffect(() => {
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  return (
    <ThemeProvider theme={themeObject}>
      {consoleOpen ? (
        <div className="flex gap-0">
          <ConsoleWrapper>
            <ButtonWrapper>
              <ConsoleButton>
                console
                <IconButton size="small">
                  <CloseIcon fontSize="small" onClick={closeConsole} />
                </IconButton>
              </ConsoleButton>
            </ButtonWrapper>
            <div
              style={{
                width: '100%',
                height: '200px',
                padding: '8px',
                color: isError ? 'error.main' : '',
                border: '0.5px solid',
                borderColor: isError ? 'error.main' : 'text.primary',
                overflow: 'auto',
                fontSize: '18px',
              }}
            >
              {output
                ? output.map((line, i) => <Typography key={i}>{line}</Typography>)
                : 'Click "Run Code" to see the output here'}
            </div>
          </ConsoleWrapper>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          />
        </div>
      ) : null}
    </ThemeProvider>
  );
});

Console.displayName = 'Console';

export default Console;
