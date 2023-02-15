import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { authApi } from '../api';
import { RiAddCircleLine } from 'react-icons/ri';
import { Container } from '../components/Container';
import styled from 'styled-components/macro';

import TodoList from '../components/TodoList';

export default function Todo() {
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState(null);
  const [newTodoContent, setNewTodoContent] = useState('');

  useEffect(() => {
    if (todoList == null) {
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
    } catch (err) {
      console.log('todo get err', err);
    }
  };

  const createTodo = async () => {
    try {
      if (newTodoContent != '') {
        await authApi.post('/todos', {
          todo: newTodoContent,
        });
        let copy = [...todoList, response.data];
        setTodoList(copy);
      }
    } catch (err) {
      console.log('todo create err', err);
    }
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
        <form>
          <InputBox>
            <TodoInput
              data-testid="new-todo-input"
              type="text"
              onChange={onNewTodoChange}
            ></TodoInput>
            <button
              type='submit'
              data-testid="new-todo-add-button"
              onClick={createTodo}
              onKeyDown={handleKeyPress}
            >
              <RiAddCircleLine className="icon" />
            </button>
          </InputBox>
        </form>
        <TodoList todoList={todoList} getTodos={getTodos} />
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