import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '../api';
import { Container } from '../components/Container';
import * as S from '../styles/Auth.styles';

export default function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if(token) {
      navigate('/todo');
    }
  }, [])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState(true);
  const [pwdError, setPwdError] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const emailChange = (e) => {
    let value = e.target.value;

    if (value === '') {
      setErrorMsg('이메일을 입력해주세요');
      setEmailError(true);
    } else if (!value.includes('@')) {
      setErrorMsg("이메일은 '@' 포함하여 입력해주세요");
      setEmailError(true);
    } else {
      setErrorMsg('');
      setEmailError(false);
    }
    setEmail(value);
  };


  const passwordChange = (e) => {
    let value = e.target.value;

    if (value === '') {
      setErrorMsg('비밀번호를 입력해주세요');
      setPwdError(true);
    } else if (value.length < 8) {
      setErrorMsg('비밀번호는 8자 이상 입력해주세요');
      setPwdError(true);
    } else {
      setErrorMsg('');
      setPwdError(false);
    }
    setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        if (!emailError && !pwdError) {
          const response = await api.post('/auth/signin', {
            email: email,
            password: password,
          });
          const accessToken = response.data.access_token;
          localStorage.setItem('user', accessToken);
          navigate('/todo');
          return response;
        }
      } catch (err) {
        setErrorMsg(err.response.data.message);
      }
  };

  return (
    <Container>
      <S.AuthBox>
        <h1>로그인</h1>
        <S.InputBox>
          <S.InputTitle>이메일</S.InputTitle>
          <S.Input type="text" data-testid="email-input" onChange={emailChange}></S.Input>
          <S.InputTitle>비밀번호</S.InputTitle>
          <S.Input type="password" data-testid="password-input" onChange={passwordChange}></S.Input>
        </S.InputBox>
        <p className='errMsg'>{errorMsg}</p>
        <S.SubmitBtn
          data-testid="signin-button"
          disabled={emailError || pwdError ? true : false}
          className={emailError || pwdError ? 'error' : ''}
          onClick={handleSubmit}
        >
          로그인
        </S.SubmitBtn>
        <p>아이디가 없으신가요?</p>
        <S.Navigate to="/signup">회원가입하러가기</S.Navigate>
      </S.AuthBox>
    </Container>
  );
}
