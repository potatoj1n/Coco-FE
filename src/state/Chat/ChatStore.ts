import { create } from 'zustand';

export interface Message {
  memberId: string;
  message: string;
  nickname: string;
  createdAt: string;
  chatId: string;
}

interface ChatState {
  messages: Message[];
  addMessage: (message: Message) => void;
  deleteMessage: (id: string) => void;
}

const useChatStore = create<ChatState>(set => ({
  messages: [], // 초기 메시지 배열

  // 메시지 추가 함수
  addMessage: (message: Message) =>
    set(state => {
      const newMessages = [...state.messages, message];
      console.log('Messages after adding:', newMessages);
      return { messages: newMessages };
    }),

  // 메시지 삭제 함수
  deleteMessage: chatId =>
    set(state => ({
      messages: state.messages.filter(message => message.chatId !== chatId),
    })),
}));

export default useChatStore;
