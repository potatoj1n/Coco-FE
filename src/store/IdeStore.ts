import create from 'zustand';

interface LanguageStore {
  language: string;
  setLanguage: (language: string) => void;
}

const useLanguageStore = create<LanguageStore>(set => ({
  language: 'javascript',
  setLanguage: language => set({ language }),
}));

export default useLanguageStore;
