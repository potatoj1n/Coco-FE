interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  theme: string;
  pw?: string;
}

import React, { useState } from 'react';
import '../../components/Animation.css';
import { CancleBtn, ConfirmDiv, ConfirmWrapper, Eyes, SaveBtn } from './ConfirmPwStyles';
import { ReactComponent as Eye } from '../../assets/eye.svg';
import { ReactComponent as EyeOff } from '../../assets/eye_off.svg';
import axios from 'axios';

const Modal: React.FC<ModalProps> = ({ isOpen, children, theme }) => {
  const backgroundColor = theme === 'light' ? 'white' : '#1C2631';

  if (!isOpen) return null;

  return (
    <ConfirmDiv
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '100%',
        width: '100%',
        zIndex: '10',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)',
      }}
    >
      <ConfirmDiv
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: backgroundColor,
          borderRadius: '5px',
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '55%',
        }}
      >
        {children}
      </ConfirmDiv>
    </ConfirmDiv>
  );
};

const Confirmpassword: React.FC<ModalProps> = ({ isOpen, onClose, theme, pw }) => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [changePw, setChangePw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const max_length = 10;
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,10}$/;
  const [pwType, setpwType] = useState({
    type: 'password',
    visible: false,
  });

  const handelPwType = () => {
    setpwType(() => {
      if (!pwType.visible) {
        return { type: 'text', visible: true };
      } else {
        return { type: 'password', visible: false };
      }
    });
  };

  const OnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'pw') {
      const sliceValue = value.slice(0, max_length);
      setPassword(sliceValue);
    } else if (name === 'changePw') {
      const sliceValue = value.slice(0, max_length);
      setChangePw(sliceValue);
    } else if (name === 'confirmPw') {
      const sliceValue = value.slice(0, max_length);
      setConfirmPw(sliceValue);
    }
  };
  const handleError = (error: string) => {
    setError(error);
    setTimeout(() => {
      setError('');
    }, 600);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password == '' || changePw === '' || confirmPw === '') {
      handleError('입력하지 않은 필드가 있습니다.');
      return;
    } else if (password !== pw) {
      handleError('현재 비밀번호가 일치하지 않습니다.');
      return;
    } else if (!passwordRegex.test(changePw)) {
      handleError('비밀번호는 8~10자이며, 특수문자를 포함해야 합니다.');
      return;
    } else if (changePw !== confirmPw) {
      handleError('변경할 비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post(`http://3.37.87.232:8080/api/members/id/profile`, {
        newPassword: confirmPw,
      });
      console.log(response.data);
      enhancedOnClose();
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  const enhancedOnClose = () => {
    setpwType(() => {
      return { type: 'password', visible: false };
    });
    setChangePw('');
    setConfirmPw('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} theme={theme}>
        <ConfirmWrapper onSubmit={handleSubmit}>
          <span className="font-semibold mt-3 bounce" style={{ width: 'auto', fontSize: '20px' }}>
            <span style={{ color: '#28b381', fontSize: '20px' }}>암호</span> 변경
          </span>
          <span className="mt-5">현재 비밀번호</span>
          <ConfirmDiv>
            <input name="pw" onChange={OnChange} type="password" value={password} />
          </ConfirmDiv>
          <span className="mt-5">변경 비밀번호</span>
          <ConfirmDiv style={{ position: 'relative' }}>
            <input name="changePw" type={pwType.type} onChange={OnChange} value={changePw} />
            <Eyes onClick={handelPwType}>{pwType.visible ? <Eye /> : <EyeOff />}</Eyes>
          </ConfirmDiv>
          <span className="mt-5">비밀번호 확인</span>
          <ConfirmDiv>
            <input name="confirmPw" onChange={OnChange} type="password" value={confirmPw} />
          </ConfirmDiv>
          <p className="text-sm text-red-500">{error}</p>
          <ConfirmDiv
            style={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', border: 'none' }}
            className="mt-10"
          >
            <SaveBtn>확인</SaveBtn>
            <CancleBtn type="button" onClick={enhancedOnClose}>
              취소
            </CancleBtn>
          </ConfirmDiv>
        </ConfirmWrapper>
      </Modal>
    </>
  );
};

export default Confirmpassword;
