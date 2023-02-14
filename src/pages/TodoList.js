import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '../api';
import {
  RiAddCircleLine,
  RiPencilFill,
  RiDeleteBinFill,
  RiCloseFill,
} from 'react-icons/ri';
import { Container } from '../components/Container';
import styled from 'styled-components/macro';
import checkTrue from '../assets/checkTrue.png';
import checkFalse from '../assets/checkFalse.png';

export default function TodoList() {
  const navigate = useNavigate();

  const [add, setAdd] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const [todoList, setTodoList] = useState(null);
  const [newTodoContent, setNewTodoContent] = useState('');

  useEffect(() => {
    if(todoList == null) {
      getTodos();
    };

    const token = localStorage.getItem('user');
    if (!token) {
      navigate('/signin');
    };
  }, [todoList]);

  const getTodos = async () => {
    try {
      const response = await authApi.get('/todos');
      setTodoList(response.data);
      console.log(response.data);
    } catch (err) {
      console.log('todo get err', err);
    }
  };

  const createTodo = async () => {
    try {
      if (newTodoContent != '') {
        const response = await authApi.post('/todos', {
          todo: newTodoContent,
        });
        let copy = [...todoList, response.data];
        setTodoList(copy);
      }
      return false;
    } catch (err) {
      console.log('todo create err', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await authApi.delete(`/todos/${id}`);
      getTodos();
      console.log(response);
    } catch (err) {
      console.log('todo delete err', err);
    }
  };

  const changeCheck = (e) => {
    if (e.target.checked) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const onEditToggle = (id) => {
    console.log(id);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createTodo();
    }
  };

  const onNewTodoChange = (e) => {
    e.preventDefault();
    setNewTodoContent(e.target.value);
  };

  return (
    <Container>
      <TodoBox>
        <h1>TODO LIST</h1>
        <InputBox>
          <TodoInput
            data-testid="new-todo-input"
            type="text"
            onChange={onNewTodoChange}
          ></TodoInput>
          <button
            data-testid="new-todo-add-button"
            onClick={createTodo}
            onKeyDown={handleKeyPress}
          >
            <RiAddCircleLine className="icon" />
          </button>
        </InputBox>
        <ListBox>
          {todoList != null && todoList.length != 0 ? (
            todoList.map((todo, i) => {
              return (
                <ListItem key={i}>
                    <>
                      <TodoInput
                        type="text"
                        data-testid="modify-input"
                        value={todo.todo}
                      ></TodoInput>
                      <ListBtnWrap>
                        <button
                          data-testid="submit-button"
                          onClick={()=> onEditToggle(todo.id)}
                        >
                          <RiPencilFill className="icon" />
                        </button>
                        <button data-testid="cancel-button">
                          <RiCloseFill className="icon"></RiCloseFill>
                        </button>
                      </ListBtnWrap>
                    </>
                    <div>
                      <CheckBox
                        type="checkbox"
                        id="todoitem"
                        onChange={changeCheck}
                        checkTrue={checkTrue}
                        checkFalse={checkFalse}
                        checked={todo.isCompleted}
                      ></CheckBox>
                      <label htmlFor="todoitem">{todo.todo}</label>
                      <ListBtnWrap>
                        <button
                          data-testid="modify-button"
                          onClick={() => onEditToggle(todo.id)}
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
                    </div>
                </ListItem>
              );
            })
          ) : (
            <p>등록된 할일이 없습니다.</p>
          )}
        </ListBox>
      </TodoBox>
    </Container>
  );
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
    cursor: pointer;
    color: ${(props) => props.theme.colors.BLUE_300};
  }

  & button {
    padding: 0;
    background: none;
    margin-left: 10px;
  }
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  & .icon {
    font-size: 30px;
  }
`;

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

const ListBox = styled.ul`
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;

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
