import { styled } from 'styled-components';

export const Title = styled.div`
  border-bottom: 0.3px solid #a3a3a3;
  margin-bottom: 8px;
  padding: 7px 10px;
  display: flex;
  justify-content: space-between;
  gap: 8px;
  align-items: center;
  font-size: 18px;
`;
export const ProjectWrapper = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
`;
export const FolderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 0.5px solid;
  width: 500px;
  height: 400px;
  padding: 30px;
  background-color: ${props => props.theme.backgroundColor};
  position: fixed;
`;
export const CreateCustomButton = styled.div`
  border: 1px solid #28b381;
  font-size: 16px;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
`;

export const EditorButton = styled.div`
  display: flex;
  justify-content: space-between;
  border: 0.5px solid;
  border-top-right-radius: 20px;
  background-color: #28b381;
  color: black;
  font-size: 16px;
  font-weight: 600;
  padding: 10px;
  width: 140px;
  height: 40px;
`;
export const ConsoleButton = styled.div`
  width: max-content;
  height: auto;
  background-color: #28b381;
  color: black;
  font-weight: 600;
  padding: 8px;
  font-size: 16px;
`;

export const ConsoleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
export const ButtonWrapper = styled.div`
  background-color: ${props => props.theme.ButtonWrapperBackground};
`;
export const FileTreeWrapper = styled.div`
  font-size: 16px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 3px;
`;
export const FileWrapper = styled.div`
  border: none;
  // :hover {
  //   background-color: rgba(118, 193, 175, 0.3);
  //   border-radius: 4px;
  // }
`;
export const FontColor = styled.h1`
  color: ${({ theme }) => (theme.themeColor === 'dark' ? '#FFFFFF' : '#000000')};
`;
