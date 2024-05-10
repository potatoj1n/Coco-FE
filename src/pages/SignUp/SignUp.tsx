import { Link, useNavigate } from 'react-router-dom';
import { Switcher } from '../Login/LoginStyles';
import { Check, Error, Form, SignUpInput, SignUpPart, SignUpWrapper } from './SignUpStyles';
import { useState } from 'react';
import EmailAuthModal from '../../components/EmailAuthModal';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [nickname, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const max_length = 10;
  const [InputCount, setInputCpunt] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === 'nickname') {
      //닉네임 글자 수 제한
      const sliceValue = value.slice(0, max_length);
      setNickName(sliceValue);
      setInputCpunt(sliceValue.length);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    } else if (name === 'passwordcheck') {
      setPasswordCheck(value);
    }
  };
  const onEmailCheck = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      //인증버튼 눌렀을 때 이메일을 입력하지 않았을 경우
      alert('이메일을 입력해주세요.');
    } else if (!emailRegex.test(email)) {
      //인증버튼 눌렀을 때 이메일 형식이 올바르지 않을 경우
      alert('유효한 이메일 주소를 입력해주세요.');
    } else {
      // try {
      //   //이메일 인증을 위해 서버로 이메일 보내기
      //   const response = await axios.post('/signup', { email: email });
      setIsModalOpen(true);
      //   console.log(response.data);
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };
  const onCloseModal = () => {
    setIsModalOpen(false); // 모달을 닫아줍니다
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setError('');
    if (isLoading || passwordCheck == '' || nickname === '' || password === '' || email === '') return;
    else if (passwordCheck !== password) {
      setError('비밀번호가 일치하지 않습니다.');
      //timeout 설정할까??
      return;
    } else if (!emailRegex.test(email)) {
      //이메일 형식이 맞지 않을 경우 에러설정
      setError('유효한 이메일 주소를 입력해주세요.');
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
              인증
            </Check>
            <EmailAuthModal isOpen={isModalOpen} onClose={onCloseModal} />
          </div>
          <span className="mt-6 text-lg">닉네임</span>

          <SignUpInput onChange={onChange} name="nickname" value={nickname} type="text" placeholder="닉네임" required />
          <div className="text-sm" style={{ textAlign: 'right' }}>
            <p style={{ width: '80%', color: 'green' }}>
              {InputCount.toLocaleString()}/{max_length.toLocaleString()}자
            </p>
          </div>
          <span className="mt-2 text-lg">비밀번호</span>
          <SignUpInput
            onChange={onChange}
            name="password"
            value={password}
            type="password"
            placeholder="비밀번호"
            required
          />
          <span className=" mt-6 text-lg">비밀번호 확인</span>
          <SignUpInput
            onChange={onChange}
            name="passwordcheck"
            value={passwordCheck}
            type="password"
            placeholder="비밀번호 확인"
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
