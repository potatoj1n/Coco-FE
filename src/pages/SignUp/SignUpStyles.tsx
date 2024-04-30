import styled from 'styled-components';

export const SignUpWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const SignUpPart = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  width: 75%;
  span {
    width: 70%;
  }
  div {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-left: 15%;
    height: 9%;
    position: relative;
    justify-content: center;
  }
`;
export const Check = styled.button`
  height: 80%;
  width: 13%;
  background-color: #76ecc2;
  position: absolute;
  right: 0;
  color: black;
  border-radius: 15px;
  white-space: nowrap;
`;

export const SignUpInput = styled.input`
  border: 1.5px solid #28b381;
  font-size: 18px;
  width: 70%;
  border-radius: 5px;
  height: 9%;
  padding: 10px 20px;
  &::placeholder {
    background-image: url('../../assets/signUp_user.png');
  }
  &[type='submit'] {
    cursor: pointer;
    border: none;
    background-color: #28b381;
    height: 9%;
    color: white;
    font-weight: 600;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const Error = styled.span`
  color: red;
  font-size: 14px;
  width: auto;
`;
