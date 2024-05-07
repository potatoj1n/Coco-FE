import create from 'zustand';

interface ChatState {
  count: number;
  increase: () => void;
  decrease: () => void;
}

const useChatStore = create<ChatState>(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  decrease: () => set(state => ({ count: state.count - 1 })),
}));

export default useChatStore;
