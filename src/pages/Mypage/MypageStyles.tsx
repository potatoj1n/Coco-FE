import styled from 'styled-components';

export const MainPageWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  padding: 0 200px 0px 200px;
  flex-direction: column;
  /* justify-content: center;
  align-items: center; */
`;
export const AttendanceDiv = styled.div`
  border-radius: 15px;
  background-color: #e1f9f0;
  height: 32%;
  width: 100%;
  padding: 30px 50px;
`;

export const UserInfo = styled.div`
  margin-top: 30px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const EditUser = styled.div`
  border: 1px solid blue;
  display: flex;
  height: 100%;
  width: 100%;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const UserInput = styled.input`
  width: 80%;
  height: 15%;
  border: 1px solid blue;
`;
