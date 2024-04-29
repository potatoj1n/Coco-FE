import styled from 'styled-components';

export const MainWrapper = styled.div`
  width: 100%;
  display: flex;
  /* margin-top: 5%; */
  height: 100%;
  /* border: 1px solid yellow; */
`;

export const MainLogo = styled.div`
  width: 40%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainImg = styled.div`
  width: 60%;
  height: 100%;
  img {
    object-fit: contain;
    /* height: 100px; */
  }
  background-color: ${({ theme }) => (theme.themeColor === 'dark' ? 'transparent' : theme.lightBackground)};
  /* border: 1px solid black; */
`;
export const Phrases = styled.div`
  margin-top: 5%;
  font-family: 'Jura';
  font-size: 45px;
  display: flex;
  flex-direction: column;
  /* border: 1px solid blue; */
  line-height: 60px;
  letter-spacing: 3px;
`;
export const Highlight = styled.span`
  color: #23be87;
`;
export const LoginBtn = styled.button`
  margin-top: 5%;
  color: white;
  border-radius: 20px;
  background-color: #23be87;
  height: 50px;
  width: 130px;
`;
