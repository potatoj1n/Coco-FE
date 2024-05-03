import { Link, useNavigate } from 'react-router-dom';
import { Switcher } from '../Login/LoginStyles';
import { Check, Error, Form, SignUpInput, SignUpPart, SignUpWrapper } from './SignUpStyles';
import { useState } from 'react';

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'nickname') {
      setNickName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordcheck') {
      setPasswordCheck(value);
    }
  };
  const onEmailCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const EmailCheck = {
      email: email,
    };
    console.log(EmailCheck);
    //이메일 백엔드로 보내서 이미 있는 이메일인지 확인하기
  };

  const onNickNameCheck = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email == '') {
      setError('이메일을 입력해주세요.');
      return;
    }
    const NickNameCheck = {
      nickname: nickname,
    };
    console.log(NickNameCheck);
    //이메일 백엔드로 보내서 이미 있는 닉네임있는지 확인하기
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (isLoading || passwordCheck == '' || nickname === '' || password === '' || email === '') return;
    else if (passwordCheck !== password) {
      setError('비밀번호가 일치하지 않습니다.');
      //timeout 설정할까??
      return;
    }
    const userSignUp = {
      nickname: nickname,
      email: email,
      password: password,
    };
    console.log(userSignUp);
    try {
      setLoading(true);

      //유저정보 받아오기(나중에 추가)
      //받아와서 업데이트 해주고 로그인페이지로 이동.
      navigate('/login');
    } catch (e) {
      //에러 캐치
      console.log(e);
    } finally {
      //로딩 상태 해제
      //작업 상태 완료됨을 나타내고 로딩 컴포넌트를 숨길 수 있음.
      setLoading(false);
    }
    console.log(nickname, email, password);
  };
  return (
    <SignUpWrapper>
      <SignUpPart>
        <span className="text-3xl mt-9 flex justify-center font-bold">회원가입</span>
        <Form onSubmit={onSubmit}>
          <span className="mt-12 text-lg">이메일</span>
          <div>
            <SignUpInput
              value={email}
              onChange={onChange}
              placeholder="이메일"
              name="email"
              type="email"
              style={{ height: '100%', width: '82%' }}
              required
            />
            <Check onClick={onEmailCheck} className="text-sm">
              중복확인
            </Check>
          </div>
          <span className="mt-6 text-lg">닉네임</span>

          <SignUpInput onChange={onChange} name="nickname" value={nickname} type="text" placeholder="닉네임" required />
          <span className="mt-6 text-lg">비밀번호</span>
          <SignUpInput
            onChange={onChange}
            name="password"
            value={password}
            type="password"
            placeholder="비밀번호"
            required
          />
          <span className=" mt-6 text-lg">비밀번호</span>
          <SignUpInput
            onChange={onChange}
            name="passwordcheck"
            value={passwordCheck}
            type="password"
            placeholder="비밀번호"
            required
          />
          <SignUpInput type="submit" className="mt-12" value={isLoading ? '로딩 중..' : '회원가입'} />
        </Form>
        {error !== '' ? <Error>{error}</Error> : null}
        <Switcher className="mt-5">
          이미 회원이라면?{' '}
          <Link to="/login" className="underline">
            로그인 하러 가기 &rarr;
          </Link>
        </Switcher>
      </SignUpPart>
    </SignUpWrapper>
  );
};

export default SignUp;
