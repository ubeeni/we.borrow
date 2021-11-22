import React, {useState} from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import IDicon from "../img/id.png";
import PWicon from "../img/pw.png";
import axios from "axios";

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
    cursor: pointer;
  }
`

export default function LoginBox() {

  const [id, setId] = useState(''); 
  const [pw, setPw] = useState('');
  
  const onIdHandler = (event) => {
    setId(event.currentTarget.value)
  }

  const onPwHandler = (event) => {
    setPw(event.currentTarget.value)
  }

  const login = () => {
    axios.post('http://localhost:4000/api/login', {
      id: id,
      pw: pw
    })
        .then((Response)=>{
            if(Response.data[0].id==id && Response.data[0].password==pw) {
              if(Response.data[0].checkadmin==0) {
                window.location.href="/MainUser"
                axios.post('http://localhost:4000/api/temp', {
                  userId: id
                })
              }
              else {
                window.location.href="/Main"
              }
              return id;
            }
            else {
              return alert('아이디 또는 비밀번호를 확인해주세요!')
            }
        })
        .catch((Error)=>{console.log(Error)}) 
        
  }

  return <>
    <StyledLogin>
        <div id="userIDdiv">
          <img src={IDicon} className="IDiconImg"/>
          <input
            id="userID"
            type="text"
            value={id}
            placeholder="ID"
            onChange={onIdHandler}
        />
        </div>
        <div id="userPWdiv"> 
        <img src={PWicon} className="PWiconImg"/>
          <input
            id="userPW"
            type="password"
            value={pw}
            placeholder="PW"
            onChange={onPwHandler}
          />
        </div>
        <button onClick={login}>
          로그인
        </button> 
    </StyledLogin>
  </>;

}
