import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  position: absolute;
  align-items: center;

  input {
    height: 20px;
    margin: 15px 10px;
    border: 2px solid;
  }
`

export default function Input({title, detail, closeModal}) {
  
  return <>
    <StyledInput>
       <h3>{title}</h3>
       <div classname="inputDiv">
        <input
          className="RegisterInput"
          type="text"
          placeholder="물품명"/>
          <input
            className="RegisterInput"
            type="text"
            placeholder="물품번호"/>
          <input
            className="RegisterInput"
            type="text"
            placeholder="대여가능일수"/>
          <input
            className="RegisterInput"
            type="text"
            placeholder="상세설명"/>
          <input
            className="detailsCheck"
            type="checkbox"/>{detail}
        </div>
        <button onClick={closeModal}>{title}</button>
    </StyledInput>
  </>;

}