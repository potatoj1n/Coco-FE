import { create } from 'zustand';

interface Auth {
  email: string;
  nickname: string;
  memberId: string;
  setAuthInfo: (email: string, nickname: string, memberId: string) => void;
  clearAuthInfo: () => void;
}
const useAuthStore = create<Auth>(set => ({
  email: localStorage.getItem('email') || '',
  nickname: localStorage.getItem('nickname') || '',
  memberId: localStorage.getItem('memberId') || '',
  setAuthInfo: (email, nickname, memberId) => {
    localStorage.setItem('email', email);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('memberId', memberId);
    set({ email, nickname, memberId });
  },
  clearAuthInfo: () => {
    localStorage.removeItem('email');
    localStorage.removeItem('nickname');
    localStorage.removeItem('memberId');
    set({ email: '', nickname: '', memberId: '' });
  },
}));

export default useAuthStore;
