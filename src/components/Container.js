import React from 'react';
import styled from 'styled-components/macro';

export function Container({ children }) {
  return (
    <Wrap>
    {children}
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: 0.5s ease;
  max-width: 1200px;
  margin:auto;
  padding-top: 150px;
`;
