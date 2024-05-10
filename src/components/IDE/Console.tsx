import React from 'react';
import { IconButton, Snackbar, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import { ButtonWrapper, ConsoleButton, ConsoleWrapper, InputWrapper } from './IdeStyle';
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
  const closeInput = () => {
    setConsoleOpen(!consoleOpen);
  };

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
          <InputWrapper>
            <ButtonWrapper>
              <ConsoleButton>
                Input
                <IconButton size="small">
                  <CloseIcon fontSize="small" onClick={closeInput} />
                </IconButton>
              </ConsoleButton>
            </ButtonWrapper>
            <TextField
              multiline
              variant="outlined"
              fullWidth
              sx={{
                height: '200px',
                '& textarea': {
                  height: '100%',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: themeColor === 'light' ? '#000000' : '#ffffff',
                    borderWidth: '0.5px',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#28b381',
                  },

                  backgroundColor: themeColor === 'light' ? '#ffffff' : '#243B56',
                  color: themeColor === 'light' ? 'black' : '#76ECC2',
                },
              }}
            ></TextField>
          </InputWrapper>

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
};

export default Console;
