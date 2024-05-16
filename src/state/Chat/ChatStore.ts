import { create } from 'zustand';

export interface Message {
  id: number;
  username: string;
  text: string;
  owner: 'mine' | 'other';
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  deleteMessage: (id: number) => void;
}

const useChatStore = create<ChatState>(set => ({
  messages: [], // 초기 메시지 배열

  // 메시지 추가 함수
  addMessage: (message: Message) =>
    set(state => ({
      messages: [...state.messages, message],
    })),

  // 메시지 삭제 함수
  deleteMessage: id =>
    set(state => ({
      messages: state.messages.filter(message => message.id !== id),
    })),
}));

export default useChatStore;
