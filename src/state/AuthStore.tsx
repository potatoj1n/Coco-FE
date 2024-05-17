import { create } from 'zustand';

interface Auth {
  email: string;
  nickname: string;
  memberId: string;
  setAuthInfo: (email: string, nickname: string, memberId: string) => void;
  clearAuthInfo: () => void;
}
const useAuthStore = create<Auth>(set => ({
  email: sessionStorage.getItem('email') || '',
  nickname: sessionStorage.getItem('nickname') || '',
  memberId: sessionStorage.getItem('memberId') || '',
  setAuthInfo: (email, nickname, memberId) => {
    sessionStorage.setItem('email', email);
    sessionStorage.setItem('nickname', nickname);
    sessionStorage.setItem('memberId', memberId);
    // console.log('로컬스토리지', typeof memberId);
    set({ email, nickname, memberId });
  },
  clearAuthInfo: () => {
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('nickname');
    sessionStorage.removeItem('memberId');
    set({ email: '', nickname: '', memberId: '' });
  },
}));

export default useAuthStore;
