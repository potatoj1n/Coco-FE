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
export const Container = styled.div`
  overflow: hidden;
`;
export const StyledDiv = styled.div`
  background: ${({ theme }) => theme.background};
  border-right: 1px solid ${({ theme }) => theme.borderColor};

  height: 100vh; // 'h-screen' 대응
  max-width: max-content; // 'w-max' 대응
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const MessageContainer = styled.div`
  display: flex;
  position: fixed;
  top: 64px;
  bottom: 64px;
  left: 20px;
  right: 0;
  flex-direction: column;
  padding: 5px 7vw;
  overflow-y: scroll;
  height: calc(100% - 128px);
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0px 10px 0px 10px;
`;
export const MyUserContainer = styled(UserContainer)`
  margin: 0px 10px 20px 10px;
`;

export const UserName = styled.h1`
  font-size: 12px;
  margin-top: 0.6rem;
`;
export const Timestamp = styled.h1`
  font-size: 12px;
  margin-bottom: 10px;
`;

export const UserIcon = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

export const MessageFlexContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;
export const MyMessageTrash = styled.img`
  width: 15px;
  height: 15px;
  margin: 0px -12px 0px 0;
  cursor: pointer;
`;

export const MessageOther = styled.div`
  align-self: flex-start;
  display: flex;
  margin: 9px 0px;
  align-items: flex-end;
  width: 100%;
`;

export const MessageMine = styled(MessageOther)`
  margin-right: 10px;
  align-items: flex-end;
  justify-content: flex-end;
`;

export const MessageMinetext = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: 1px solid rgba(102, 102, 102, 0.6);
  background-color: #9be9a8;
  padding: 15px 20px;
  margin: 5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  font-size: 16px;
  color: black;
  max-width: calc(100% - 250px);
`;
export const MessageOthertext = styled(MessageMinetext)`
  background-color: #fff;
`;

export const ChatContainer = styled.div`
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.background};
  border-top: 1px solid ${({ theme }) => theme.borderColor};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 95%;
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
  width: 85%;
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
  right: 4vw;
  width: 35px;
  height: 35px;
`;

export const SearchInput = styled.input<SearchInputProps>`
  flex-grow: 1;
  outline: none;
  padding: 10px 20px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  position: fixed;
  bottom: 150px;
  right: 30px;
  width: 90%;
  max-width: 500px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
