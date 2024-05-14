import { create } from 'zustand';

interface ConsoleStore {
  output: string[] | null;
  isLoading: boolean;
  isError: boolean;
  openSnackbar: boolean;
  snackbarMessage: string;
  consoleOpen: boolean;
  setOpenSnackbar: (openSnackbar: boolean) => void;
  setOutput: (output: (prevOutput: string[] | null) => string[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: boolean) => void;
  setSnackbarMessage: (snackbarMessage: string) => void;
  setConsoleOpen: (consoleOpen: boolean) => void;
}

const useConsoleStore = create<ConsoleStore>(set => ({
  output: [],
  isLoading: false,
  isError: false,
  openSnackbar: false,
  snackbarMessage: '',
  consoleOpen: false,
  setOutput: updater => set(state => ({ output: updater(state.output) })),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setIsError: (isError: boolean) => set({ isError }),
  setOpenSnackbar: (openSnackbar: boolean) => set({ openSnackbar }),
  setSnackbarMessage: (snackbarMessage: string) => set({ snackbarMessage }),
  setConsoleOpen: (consoleOpen: boolean) => set({ consoleOpen }),
}));

export default useConsoleStore;
