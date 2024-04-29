import styled from 'styled-components';
import { useTheTheme } from '../../components/Theme';

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
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainImg = styled.div`
  width: 60%;
  height: 100%;
  img {
    object-fit: contain;
  }
  background-color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.lightColor : 'transparent')};
`;
export const Phrases = styled.div`
  margin-top: 5%;
  font-family: 'Jura'; //폰트 뭐지??
  font-size: 45px;
  display: flex;
  flex-direction: column;
  line-height: 60px;
  letter-spacing: 6px;
`;
export const Text = styled.span`
  color: ${({ theme }) => (theme.themeColor === 'dark' ? '#ffffff' : '#000000')};
`;
export const Highlight = styled.span`
  color: #23be87;
`;
export const LoginBtn = styled.button`
  margin-top: 5%;
  color: ${({ theme }) => (theme.themeColor === 'dark' ? theme.darkColor : theme.lightColor)};
  border-radius: 20px;
  font-weight: 600;
  letter-spacing: 2px;
  background-color: #23be87;
  height: 50px;
  width: 140px;
`;
