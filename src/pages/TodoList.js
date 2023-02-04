import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { RiAddCircleLine, RiPencilFill, RiDeleteBinFill } from "react-icons/ri";
import { Container } from '../components/Container';
import styled from 'styled-components/macro';
import checkTrue from '../assets/checkTrue.png';
import checkFalse from '../assets/checkFalse.png';

export default function TodoList() {
  const [checked, setChecked] = useState(false);
  const [edit, setEdit] = useState(false);

  const changeCheck = (e) => {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }

  const changeEdit = (e) => {
    if (!edit) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }

  return (
    <Container>
      <TodoBox>
        <h1>TODO LIST</h1>
        <InputBox>
          <TodoInput type='text'></TodoInput>
          <RiAddCircleLine className='icon' />
        </InputBox>
        <ListBox>
          {edit == true ? (
            <>
              <TodoInput type='text'></TodoInput>
              <ListBtnWrap>
                <RiPencilFill className='icon' onClick={changeEdit} />
              </ListBtnWrap>
            </>
          ) : (
            <>
              <CheckBox type='checkbox' id="todoitem" onChange={changeCheck} checkTrue={checkTrue} checkFalse={checkFalse} checked={checked}></CheckBox>
              <label htmlFor="todoitem" >투두리스트만들기</label>
              <ListBtnWrap>
                <RiPencilFill className='icon' onClick={changeEdit} />
                <RiDeleteBinFill className='icon' />
              </ListBtnWrap>
            </>
          )}
        </ListBox>
      </TodoBox>
    </Container >
  )
}

const TodoBox = styled.div`
  margin: auto;
  text-align: center;
  max-width: 400px; 
  border-radius: 5px;
  background: ${(props) => props.theme.colors.WHITE_100};
  padding: 10px 50px 30px;

  & p {
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.GREY};
    margin-bottom: 5px;
  }

  & .icon {
    font-size: 23px;
    margin-left: 10px;
    cursor: pointer;
    color: ${(props) => props.theme.colors.BLUE_300};
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const TodoInput = styled.input`
  width: 100%;
  border: none;
  border-bottom:1px solid ${(props) => props.theme.colors.BLUE_100};
  background: none;
  transition: 0.3s ease;
  &:focus {
      border-bottom:2px solid ${(props) => props.theme.colors.BLUE_200};
  }
`;

const ListBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CheckBox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;

  &+label {
    display: inline-block;
    width: 78%;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    color: ${(props) => (props.checked ? props.theme.colors.GREY : props.theme.colors.BLUE_300)};
    text-align:left;
    text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};

  };

  &+label:before {
    content: '';
    position: absolute;
    left: 0;
    width: 19px;
    height: 19px;
    text-align: center;
    background: url(${(props) => props.checkFalse}) center center no-repeat;
    background-size: cover;
    box-sizing: border-box;
  }

  &:checked+label:after {
    content: '';
    position: absolute;
    left: 0;
    width: 19px;
    height: 19px;
    background: url(${(props) => props.checkTrue}) center center no-repeat;
    background-size: cover;
  }
`;

const ListBtnWrap = styled.div`
`;