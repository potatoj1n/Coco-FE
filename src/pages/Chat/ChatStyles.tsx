// chatStyles.tsx
import styled from 'styled-components';

export interface SearchInputProps {
  show?: boolean;
}

export const lightTheme = {
  text: '#666666', // 라이트 모드 폰트 색상
  borderColor: '#dedede', // 라이트 모드 보더 색상
  background: '#fff',
};

export const darkTheme = {
  text: '#fff', // 다크 모드 폰트 색상
  borderColor: '#444', // 다크 모드 보더 색상
  background: '#243B56',
};

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MessageOther = styled.div`
  align-self: flex-start;
  background-color: #ffffff;
  border-radius: 15px;
  padding: 10px 15px;
  margin: 5px;
  display: flex;
  align-items: center;
`;

export const UserName = styled.h1`
  font-size: 12px;
  margin-top: 0.6rem;
`;
export const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
export const MessageMine = styled(MessageOther)`
  align-self: flex-end;
  background-color: #9be9a8;
`;

export const MessageText = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #666666;
`;

export const ChatContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  width: 100%;
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border-radius: 20px;
`;

export const ChatInput = styled.input`
  flex-grow: 1;
  outline: none;
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  border-radius: 15px;
  background: rgba(217, 217, 217, 0.3);
  border: 1px solid ${({ theme }) => theme.borderColor};
  height: 35px;

  ::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 1 !important;
  }
`;

export const SendButton = styled.button`
  cursor: pointer;
  margin-left: 20px;
  width: 35px;
  height: 35px;
`;

export const SearchButton = styled.button`
  cursor: pointer;
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 35px;
  height: 35px;
`;

export const SearchInput = styled.input<SearchInputProps>`
  flex-grow: 1;
  outline: none;
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  background: rgba(217, 217, 217, 0.3);
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  position: fixed;
  bottom: 150px;
  right: 30px;
  width: 90%;
  max-width: 500px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
