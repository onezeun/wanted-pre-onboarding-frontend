import React, { useEffect, useState } from 'react';
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
  const [checked, setChecked] = useState(false);
  const [editToggle, setEditToggle] = useState(false);

  const [todoList, setTodoList] = useState([]);
  const [newTodoContent, setNewTodoContent] = useState('');
  
  useEffect(() => {
    getTodos();

    return () => {
      const token = localStorage.getItem('user');
      if (!token) {
        navigate('/signin');
      }
    };
  }, []);

  const getTodos = async () => {
    try {
      const response = await authApi.get('/todos');
      let copy = [...todoList, ...response.data];
      setTodoList(copy);
    } catch (err) {
      console.log('todo get err', err);
    }
  };

  const createTodo = async () => {
    try {
      const response = await authApi.post('/todos', {
        todo : newTodoContent
      });
      console.log(response);
    } catch (err) {
      console.log('todo create err', err);
    }
  };

  const changeCheck = (e) => {
    if (e.target.checked) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  };

  const changeEditToggle = () => {
    if (!editToggle) {
      setEditToggle(true);
    } else {
      setEditToggle(false);
    }
  };

  return (
    <Container>
      <TodoBox>
        <h1>TODO LIST</h1>
        <InputBox>
          <TodoInput data-testid="new-todo-input" type="text" onChange={(e) => {setNewTodoContent(e.target.value)}}></TodoInput>
          <RiAddCircleLine
            data-testid="new-todo-add-button"
            onClick={createTodo}
            className="icon"
          />
        </InputBox>
        <ListBox>
          {todoList.length != 0 ? todoList.map((todo, i ) => {
            console.log(todo)
            return(
              <ListItem key={i}>
                {editToggle == true ? (
                  <>
                    <TodoInput type="text" data-testid="modify-input" value={todo.todo}></TodoInput>
                    <ListBtnWrap>
                      <RiPencilFill
                        data-testid="submit-button"
                        className="icon"
                        onClick={changeEditToggle}
                      />
                      <RiCloseFill
                        data-testid="cancel-button"
                        className="icon"
                      ></RiCloseFill>
                    </ListBtnWrap>
                  </>
                ) : (
                  <>
                    <CheckBox
                      type="checkbox"
                      id="todoitem"
                      onChange={changeCheck}
                      checkTrue={checkTrue}
                      checkFalse={checkFalse}
                      checked={checked}
                    ></CheckBox>
                    <label htmlFor="todoitem">{todo.todo}</label>
                    <ListBtnWrap>
                      <RiPencilFill
                        data-testid="modify-button"
                        className="icon"
                        onClick={changeEditToggle}
                      />
                      <RiDeleteBinFill
                        data-testid="delete-button"
                        className="icon"
                      />
                    </ListBtnWrap>
                  </>
                )}
              </ListItem>
            )
          }) : (
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
