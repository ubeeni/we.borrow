import React from 'react';
import styled from 'styled-components';
import IDicon from "../img/id.png";
import PWicon from "../img/pw.png";

const StyledLogin = styled.div`
  position: absolute;
  top: 30%;
  left: 50%; 
  width: 360px;
  margin-left: -180px;
  align-items: center;
  background: white;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 30px 0;

  input {
    height: 20px;
    margin: 15px 10px;
    border: 2px solid;
  }

  button {
    margin-top: 30px;
    width: 80px;
    height: 27px;
  }
`

export default function LoginBox() {
  
  return <>
    <StyledLogin>
        <div id="userIDdiv">
          <img src={IDicon} className="IDiconImg"/>
          <input
            id="userID"
            type="text"
            placeholder="ID"
        />
        </div>
        <div id="userPWdiv"> 
        <img src={PWicon} className="PWiconImg"/>
          <input
            id="userPW"
            type="password"
            placeholder="PW"
          />
        </div>
        <button onClick={ () => window.location.href="/Main" }>
          로그인
        </button> 
    </StyledLogin>
  </>;

}