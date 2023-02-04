import React from 'react';
import { Container } from '../components/Container';
import * as S from './Auth.styles'

export default function SignIn() {

  return (
    <Container>
      <S.AuthBox>
        <h1>로그인</h1>
        <S.InputBox>
          <S.InputTitle>이메일</S.InputTitle>
          <S.Input type='text'></S.Input>
          <S.InputTitle>비밀번호</S.InputTitle>
          <S.Input type='text'></S.Input>
        </S.InputBox>
        <p>아이디가 없으신가요?</p>
        <S.Navigate to='/signup'>회원가입하러가기</S.Navigate>
      </S.AuthBox>
    </Container>
  )
}

