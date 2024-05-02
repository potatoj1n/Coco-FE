import create from 'zustand';

interface ConsoleStore {
  output: string[] | null;
  isLoading: boolean;
  isError: boolean;
  openSnackbar: boolean;
  snackbarMessage: string;
  setOpenSnackbar: (openSnackbar: boolean) => void;
}

const useConsoleStore = create<ConsoleStore>(set => ({
  output: null,
  isLoading: false,
  isError: false,
  openSnackbar: false,
  snackbarMessage: '',
  setOutput: (output: string[]) => set({ output }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setIsError: (isError: boolean) => set({ isError }),
  setOpenSnackbar: (openSnackbar: boolean) => set({ openSnackbar }),
  setSnackbarMessage: (snackbarMessage: string) => set({ snackbarMessage }),
}));

export default useConsoleStore;
