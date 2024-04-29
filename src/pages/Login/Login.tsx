import { LoginWrapper, LoginLogo, LoginPart, Input, Logindiv, Switcher } from './LoginStyles';
import { ReactComponent as DarkLogo } from '../../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../../assets/logo-dark.svg';
import { Highlight, Phrases } from '../FirstMain/FirstMainStyles';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';

const Login = () => {
  const { themeColor } = useTheTheme();
  return (
    <LoginWrapper>
      <LoginLogo>
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
      </LoginLogo>
      <LoginPart>
        <Logindiv>
          <span className="mb-4 text-lg text-black">이메일</span>
          <Input name="email" placeholder="Email" type="email" required className="mb-14 text-black" />
          <span className="mb-4 text-lg text-black">비밀번호</span>
          <Input name="password" placeholder="Password" type="password" required className="mb-14 text-black" />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Input type="submit" value="로그인" />
            <Switcher className="text-black">
              아직 회원이 아니라면?{' '}
              <Link to="/signup" className="underline">
                회원가입 하러 가기 &rarr;
              </Link>
            </Switcher>
          </div>
        </Logindiv>
      </LoginPart>
    </LoginWrapper>
  );
};

export default Login;
