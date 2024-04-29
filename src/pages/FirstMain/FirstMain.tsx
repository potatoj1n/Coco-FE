import FirstImg from '../../assets/FistMainIMg.png';
import { ReactComponent as DarkLogo } from '../../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../../assets/logo-dark.svg';
import { Highlight, LoginBtn, MainImg, MainLogo, MainWrapper, Phrases } from './FirstMainStyles';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';

const FirstMain = () => {
  const { themeColor } = useTheTheme();
  return (
    <MainWrapper>
      <MainLogo>
        {themeColor === 'light' ? <LightLogo /> : <DarkLogo />}
        <Phrases>
          <span>
            <Highlight>C</Highlight>ollaborative
          </span>
          <span>
            <Highlight>O</Highlight>line
          </span>
          <span>
            <Highlight>C</Highlight>oding
          </span>
          <span>
            <Highlight>O</Highlight>rganize
          </span>
          <span style={{ fontSize: '18px' }}> &quot;커뮤니티를 잇다,코딩을 넘어.&quot;</span>
        </Phrases>
        <Link to="/login">
          <LoginBtn>로그인</LoginBtn>
        </Link>
      </MainLogo>
      <MainImg>
        <img src={FirstImg} alt="FirstMainImg" />
      </MainImg>
    </MainWrapper>
  );
};

export default FirstMain;
