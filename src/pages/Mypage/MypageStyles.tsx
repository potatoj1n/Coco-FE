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

export const EditUserInfo = styled.div`
  margin-top: 30px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  height: 40%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;
export const Span = styled.span`
  position: absolute;
  /* margin-top: 20px; */
  font-size: 18px;
`;
export const UserInput = styled.input`
  width: 80%;
  height: 9%;
  border: 1px solid blue;
`;
