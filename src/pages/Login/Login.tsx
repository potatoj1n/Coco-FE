import { LoginWrapper, LoginLogo, LoginPart, Input, Logindiv, Switcher, Explain } from './LoginStyles';
import { ReactComponent as DarkLogo } from '../../assets/logo-light.svg';
import { ReactComponent as LightLogo } from '../../assets/logo-dark.svg';
import { FontColor, Highlight, Phrases, Text } from '../FirstMain/FirstMainStyles';
import { useTheTheme } from '../../components/Theme';
import { Link } from 'react-router-dom';

const Login = () => {
  const { themeColor } = useTheTheme();
  return (
    <LoginWrapper>
      <LoginLogo>
        <Phrases>
          <div className="flex justify-center mb-8">
            <Link to="/">{themeColor === 'light' ? <LightLogo /> : <DarkLogo />}</Link>
          </div>
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
          <div className="flex justify-center">
            <FontColor className="text-2xl mt-4">
              <Text>&quot;</Text>커뮤니티를 잇다<Text>,</Text>코딩을 넘어<Text>&quot;</Text>
            </FontColor>
          </div>
          <Explain className="text-sm mt-4">
            <span>
              COCO는 소통을 중시하는 사용자들을 위한
              <br /> 온라인 코딩의 미래를 모색합니다.
              <br />
              함께하는 코딩이 새로운 차원으로 확장되며,
              <br /> 사용자들 간의 연결을 위한 새로운 시작을 제공합니다.
            </span>
          </Explain>
        </Phrases>
      </LoginLogo>
      <LoginPart>
        <Logindiv>
          <span className="mb-5 text-lg text-black">이메일</span>
          <Input name="email" placeholder="이메일" type="email" required className="mb-14 text-black" />
          <span className="mb-5 text-lg text-black">비밀번호</span>
          <Input name="password" placeholder="비밀번호" type="password" required className="mb-14 text-black" />
          <Input type="submit" value="로그인" />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Switcher className="text-black mt-8">
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
