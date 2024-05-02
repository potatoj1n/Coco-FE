import { styled } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.backgroundColor};
`;
export const CustomButton = styled.div`
  border: none;
  border-radius: 8px;
  padding: 5px 23px;
`;
export const ButtonContainer = styled.div`
  background-color: ${props => props.theme.buttonBackground};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-bottom: 0.5px solid #d8dfe3;
`;
export const FileListContainer = styled.div`
  background-color: ${props => props.theme.fileListBackground};
  padding: 10px;
  width: 20%;
  border-left: 0.5px solid #d8dfe3;
  border-right: 0.5px solid #d8dfe3;
`;
export const IDEContainer = styled.div`
  background-color: ${props => props.theme.ideBackground};
  display: flex;
  flex-direction: column;
`;
