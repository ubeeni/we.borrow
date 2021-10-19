import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-block;
  outline: none;
  border: none;
  border-radius: 3px;
  background-color: black;
  color: #d4f3f8;
  width: 5.5rem;
  height: 2.0rem;
  fontSize: 1.5rem;
  font-weight: bolder;
  cursor: pointer;
  padding: 0 1rem;
  text-align: center;
  margin: 2px;
`;

export default function Button({children}) {
  return (
    <StyledButton>
      {children}
    </StyledButton>
  );
}