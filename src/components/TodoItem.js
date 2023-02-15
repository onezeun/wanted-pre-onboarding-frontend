import React, { useCallback, useEffect, useState } from 'react';

import { authApi } from '../api';
import {
  RiPencilFill,
  RiDeleteBinFill,
  RiCloseFill,
} from 'react-icons/ri';
import styled from 'styled-components/macro';
import checkTrue from '../assets/checkTrue.png';
import checkFalse from '../assets/checkFalse.png';

export default function TodoItem({ todo, getTodos }) {
  const [todoContent, setTodoContent] = useState(todo.todo)
  const [isChecked, setIsChecked] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const onTodoChange = (e) => {
    e.preventDefault();
    setTodoContent(e.target.value);
  };

  const updateTodo = async (id) => {
    try {
      if (todoContent != '') {
        await authApi.put(`/todos/${id}`, {
          todo: todoContent,
          isCompleted: todo.isCompleted
        });
        setEditToggle(false);
        getTodos();
      } 
    } catch (err) {
      console.log('todo update content err', err);
    }
  }

  const updateIsCompleted = async (id) => {
    try {
      if (todo.isCompleted) {
        await authApi.put(`/todos/${id}`, {
          todo: todo.todo,
          isCompleted: false
        });
        getTodos();
      } else {
        await authApi.put(`/todos/${id}`, {
          todo: todo.todo,
          isCompleted: true
        });
        getTodos();
      }
    } catch (err) {
      console.log('todo update completed err', err);
    }
  }

  const deleteTodo = async (id) => {
    try {
      const response = await authApi.delete(`/todos/${id}`);
      getTodos();
      console.log(response);
    } catch (err) {
      console.log('todo delete err', err);
    }
  };

  const changeEdit = (e) => {
    if (!editToggle) {
      setEditToggle(true);
    } else {
      setEditToggle(false);
    }
  }

  return (
    <ListItem>
      {editToggle ? (
        <>
          <TodoInput
            type="text"
            data-testid="modify-input"
            defaultValue={todo.todo}
            onChange={onTodoChange}
          ></TodoInput>
          <ListBtnWrap>
            <button
              data-testid="submit-button"
              onClick={() => updateTodo(todo.id)}
            >
              <RiPencilFill className="icon" />
            </button>
            <button data-testid="cancel-button">
              <RiCloseFill className="icon"></RiCloseFill>
            </button>
          </ListBtnWrap>
        </>
      ) : (
        <>
          <CheckBox
            type="checkbox"
            id="todoitem"
            onChange={() => updateIsCompleted(todo.id)}
            checkTrue={checkTrue}
            checkFalse={checkFalse}
            checked={todo.isCompleted}
          ></CheckBox>
          <label htmlFor="todoitem">{todo.todo}</label>
          <ListBtnWrap>
            <button
              data-testid="modify-button"
              onClick={changeEdit}
            >
              <RiPencilFill className="icon" />
            </button>
            <button
              data-testid="delete-button"
              onClick={() => deleteTodo(todo.id)}
            >
              <RiDeleteBinFill className="icon" />
            </button>
          </ListBtnWrap>
        </>
      )}
    </ListItem>
  );
}


const TodoInput = styled.input`
  width: 100%;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.BLUE_100};
  background: none;
  transition: 0.3s ease;
  &:focus {
    border-bottom: 2px solid ${(props) => props.theme.colors.BLUE_200};
  }
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 10px auto;

  ${TodoInput} {
    width: 78%;
  }
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

  & + label {
    display: inline-block;
    width: 78%;
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    color: ${(props) =>
    props.checked ? props.theme.colors.GREY : props.theme.colors.BLUE_300};
    text-align: left;
    text-decoration: ${(props) => (props.checked ? 'line-through' : 'none')};
  }

  & + label:before {
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

  &:checked + label:after {
    content: '';
    position: absolute;
    left: 0;
    width: 19px;
    height: 19px;
    background: url(${(props) => props.checkTrue}) center center no-repeat;
    background-size: cover;
  }
`;

const ListBtnWrap = styled.div``;
