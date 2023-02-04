import React from 'react';
import { Container } from '../components/Container';
import * as S from './Auth.styles';

export default function SignUp() {

  return (
    <Container>
      <S.AuthBox>
        <h1>회원가입</h1>
        <S.InputBox>
          <S.InputTitle>이메일</S.InputTitle>
          <S.Input type='text'></S.Input>
          <S.InputTitle>비밀번호</S.InputTitle>
          <S.Input type='text'></S.Input>
          <S.InputTitle>비밀번호 확인</S.InputTitle>
          <S.Input type='text'></S.Input>
        </S.InputBox>
        <p>이미 회원이신가요?</p>
        <S.Navigate to='/signin'>로그인하러가기</S.Navigate>
      </S.AuthBox>
    </Container>
  )
}