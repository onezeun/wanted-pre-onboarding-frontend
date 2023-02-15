import React from 'react';

import styled from 'styled-components/macro';
import TodoItem from './TodoItem';

export default function TodoList({ todoList, getTodos }) {

  return (
    <ListBox>
      {todoList != null && todoList.length != 0 ? (
        todoList.map((todo, i) => {
          return (
            <TodoItem 
              todo = {todo}
              key = {todo.id}
              getTodos={getTodos}
            />
          );
        })
      ) : (
        <p>등록된 할일이 없습니다.</p>
      )}
    </ListBox>
  );
}


const ListBox = styled.ul`
  padding: 0;
`;