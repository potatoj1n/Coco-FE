import styled from 'styled-components';

export const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
`;

export const LoginLogo = styled.div`
  width: 50%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Explain = styled.div`
  text-align: center;
  letter-spacing: 2px;
  font-weight: 500;
`;
export const LoginPart = styled.form`
  width: 50%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.lightColor : 'transparent')};
`;

export const Logindiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: auto;
`;
export const Input = styled.input`
  border: 1.5px solid #28b381;
  width: 100%;
  font-size: 18px;
  border-radius: 5px;
  padding: 10px 20px;
  &[type='submit'] {
    cursor: pointer;
    border: none;
    background-color: #28b381;
    height: 45px;
    color: white;
    font-weight: 600;
    &:hover {
      opacity: 0.8;
    }
  }
`;
export const Switcher = styled.span`
  margin-top: 30px;
  font-size: 16px;
  a {
    color: #54595b;
  }
`;
