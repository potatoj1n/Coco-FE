import { Link } from 'react-router-dom';
import { Switcher } from '../Login/LoginStyles';
import { Check, Form, SignUpInput, SignUpPart, SignUpWrapper } from './SignUpStyles';
const SignUp = () => {
  return (
    <SignUpWrapper>
      <SignUpPart>
        <span className="text-3xl mt-10 flex justify-center font-bold">회원가입</span>
        <Form>
          <span className="mt-14 text-lg">이메일</span>
          <div>
            <SignUpInput
              placeholder="이메일"
              name="email"
              type="email"
              style={{ height: '100%', width: '82%' }}
              required
            />
            <Check className="text-sm">중복확인</Check>
          </div>
          <span className="mt-5 text-lg">닉네임</span>
          <SignUpInput className="mb-5" name="nickname" type="text" placeholder="닉네임" required />
          <span className="text-lg">비밀번호</span>
          <SignUpInput className="mb-5" name="password" type="password" placeholder="비밀번호" required />
          <span className="text-lg">비밀번호</span>
          <SignUpInput className="mb-5" name="password" type="password" placeholder="비밀번호" required />
          <SignUpInput type="submit" className="mt-7" value="회원가입" />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Switcher className="mt-5">
              이미 회원이라면?{' '}
              <Link to="/login" className="underline">
                로그인 하러 가기 &rarr;
              </Link>
            </Switcher>
          </div>
        </Form>
      </SignUpPart>
    </SignUpWrapper>
  );
};

export default SignUp;
