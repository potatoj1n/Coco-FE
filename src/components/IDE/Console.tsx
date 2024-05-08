import React from 'react';
import { IconButton, Snackbar, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useConsoleStore from '../../state/IDE/ConsoleStore';
import { ConsoleButton } from './IdeStyle';

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
  const { output, isError, openSnackbar, snackbarMessage, setOpenSnackbar, consoleOpen, setConsoleOpen } =
    useConsoleStore();

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const closeConsole = () => {
    setConsoleOpen(!consoleOpen);
  };

  return (
    <>
      {consoleOpen ? (
        <div>
          <ConsoleButton>
            console
            <IconButton size="small">
              <CloseIcon fontSize="small" onClick={closeConsole} />
            </IconButton>
          </ConsoleButton>
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
    </>
  );
};

export default Console;
