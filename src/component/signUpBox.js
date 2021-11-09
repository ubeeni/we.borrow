import React from 'react';
import Logo from "../img/headLogo.png";
import styled from 'styled-components';
import IDicon from "../img/id.png";
import PWicon from "../img/pw.png"

const StyledSignUp = styled.div`
  position: absolute;
  top: 15%;
  left: 50%; 
  width: 500px;
  margin-left: -250px;
  align-items: center;
  background: white;
  border: 1px solid gray;
  border-radius: 10px;
  padding: 30px 0px;

  input {
    height: 25px;
    margin: 15px 10px;
    border: 2px solid;
  }

  Button {
    margin-top: 15px;
  }
`

export default function SignUpBox({ signUp, closeModal }) {

  return <>
    <StyledSignUp>
        <img src={Logo} className="SignUpLogo"/>
        <h2 className="signUpHead">{signUp} 회원가입</h2>
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
        <button className="signUpBoxButton">
          가입하기
        </button > 
        <button className="signUpBoxButton" onClick={closeModal}>
          닫기
        </button>
    </StyledSignUp>
  </>;

}
