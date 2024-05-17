import { styled } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundColor};
  cursor: pointer;
`;
export const CustomButton = styled.div`
  border: none;
  border-radius: 3px;
  padding: 5px 23px;
  color: black;
  background-color: #d5f2e7;
  margin-right: 10px;
`;
export const ButtonContainer = styled.div`
  background-color: ${props => props.theme.buttonBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 0.5px solid #d8dfe3;
`;
export const IconContainer = styled.div`
  border-right: 0.5px solid #d8dfe3;
  height: 100vh;
  width: max-content;
  display: flex;
  flex-direction: column;
  align-itmens: center;
`;
export const FileListContainer = styled.div`
  background-color: ${props => props.theme.fileListBackground};
  border-right: 0.5px solid #d8dfe3;
`;
export const IDEContainer = styled.div`
  background-color: ${props => props.theme.ideBackground};
  display: flex;
  flex-direction: column;
`;
