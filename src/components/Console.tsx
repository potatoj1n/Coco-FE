import React, { useState } from 'react';
import { Box, Button, Snackbar, Typography } from '@mui/material';
import { executeCode } from './api';

interface Props {
  editorRef: React.MutableRefObject<any>;
  language: string;
}

const Console: React.FC<Props> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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
    <div>
      <Button variant="outlined" color="success" disabled={isLoading} onClick={runCode}>
        Run Code
      </Button>
      <Box
        p={2}
        color={isError ? 'error.main' : ''}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? 'error.main' : 'text.primary'}
        overflow="auto"
      >
        {output
          ? output.map((line, i) => <Typography key={i}>{line}</Typography>)
          : 'Click "Run Code" to see the output here'}
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </div>
  );
};

export default Console;
