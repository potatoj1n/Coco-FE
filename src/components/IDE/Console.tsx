import React from 'react';
import { IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import { ButtonWrapper, ConsoleButton } from './IdeStyle';
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

const Console: React.FC<Props> = () => {
  const { themeColor } = useTheTheme();
  const themeObject = {
    ButtonWrapperBackground: themeColor === 'light' ? '#ffffff' : '#011627',
  };
  const { output, isError, openSnackbar, snackbarMessage, setOpenSnackbar, consoleOpen, setConsoleOpen } =
    useConsoleStore();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const closeConsole = () => {
    setConsoleOpen(!consoleOpen);
  };

  return (
    <ThemeProvider theme={themeObject}>
      {consoleOpen ? (
        <div>
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
              width: 'auto',
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
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          />
        </div>
      ) : null}
    </ThemeProvider>
  );
};

export default Console;
