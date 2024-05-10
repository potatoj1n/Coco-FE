interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

import React, { useRef, useState } from 'react';

const Modal: React.FC<ModalProps> = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '100%',
        width: '100%',
        zIndex: '10',
      }}
    >
      <div
        style={{
          boxShadow: '1px 1px 5px 2px rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          background: 'white',
          borderRadius: '8px',
          width: '30%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '50px',
          height: '50%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const EmailAuthModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [code, setCode] = useState(new Array(5).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value.slice(0, 1);
    setCode(newCode);
    if (index < 4 && value) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handleSubmit = (fullCode: string) => {
    console.log('Verification code:', fullCode);
    if (fullCode === '12345') {
      alert('Verification successful!');
      setCode(new Array(code.length).fill('')); //모두 빈 문자열로 초기화
      onClose(); //올바른 코드인 경우 모달 닫기
    } else {
      alert('Invalid code. Please try again.');
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <h2>코드를 입력하세요</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '15px', // 간격을 주어서 시각적으로 분리
            height: 'auto',
            width: 'max-content',
            padding: '0px 10px 0px 10px',
          }}
        >
          {/* 스피너 제거 */}
          <style>
            {`
          input[type='number']::-webkit-inner-spin-button,
          input[type='number']::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type='number'] {
            -moz-appearance: textfield;
          }
        `}
          </style>
          {code.map((c, idx) => (
            <input
              key={idx}
              ref={el => (inputRefs.current[idx] = el)}
              type="number"
              value={c}
              maxLength={1}
              style={{
                textAlign: 'center',
                height: '40px',
                borderBottom: '2px solid black',
                width: '40px',
              }}
              onChange={e => handleInputChange(idx, e.target.value)}
              onFocus={e => e.target.select()}
            />
          ))}
        </div>
        <button onClick={() => handleSubmit(code.join(''))}>Submit</button>
      </Modal>
    </>
  );
};

export default EmailAuthModal;
