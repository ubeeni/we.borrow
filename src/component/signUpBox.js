import React from 'react';
import styled from 'styled-components';
import Button from './button';
import IDicon from "../img/id.png";
import PWicon from "../img/pw.png";
import Logo from "../img/headLogo.png";

const StyledSignUp = styled.div`
  position: absolute;
  top: 20%;
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

  Button {
    margin-top: 15px;
  }
`

export default function SignUpBox() {
  
  return <>
    <StyledSignUp>
        <img src={Logo} className="SignUpLogo"/>
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
        <Button>
          가입하기
        </Button> 
    </StyledSignUp>
  </>;

}