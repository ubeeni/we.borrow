import React from "react";
import LoginBox from "../component/loginBox";
import Modal from 'react-modal';
import kakaoIcon from "../img/kakao.png";
import blogIcon from "../img/blog.png";
import Header from "../component/header";
import SignUpBox from "../component/signUpBox";

export default function Login(){

    const [joinOpen, setJoinOpen] = React.useState(false)
    const [registerOpen, setRegisterOpen] = React.useState(false)
    const [userOpen, setUserOpen] = React.useState(false)
    const [joinHead] = React.useState("회원가입")
    const [registerMessageValue] = React.useState("관리자가 물품을 등록합니다.")
    const [borrowMessageValue] = React.useState("사용자가 물품을 대여합니다.")

    const openJoinModal = () => {
        setJoinOpen(true);
    }

    const closeJoinModal = () => {
        setJoinOpen(false);
    }

    const onClickJoin = () => {
        openJoinModal();
    }

    const SignUpRegister = () => {
        setRegisterOpen(true);
    }

    const closeRegisterModal = () => {
        setRegisterOpen(false);
    }

    const SignUpUser = () => {
        setUserOpen(true)
    }

    const closeUserModal = () => {
        setUserOpen(false);
    }
    
    const customBoxStyles = {
        content: {
          top: '45%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          textAlign: 'center',
          transform: 'translate(-50%, -50%)',
        },
    };

    return(
        <>
            <Header></Header>
            <div className="MainContent">
                <LoginBox>
                </LoginBox>
                <button className="signUpButton" onClick={ () => onClickJoin() }>회원가입</button>
                <Modal id="JoinModal"
                    isOpen={joinOpen} 
                    style={customBoxStyles}
                    >
                        <h2>{joinHead}</h2>
                        <p>
                            <div>
                                <button className="joinButton" id="register"
                                    onClick={ () => SignUpRegister() }
                                    >
                                    관리자</button>
                                <Modal
                                    className="MainContent"
                                    isOpen={registerOpen}
                                    >
                                    <SignUpBox 
                                        signUp="관리자"
                                        closeModal={closeRegisterModal}
                                    />
                                </Modal>


                                <button className="joinButton" id="borrow"
                                    onClick={ () => SignUpUser() }
                                    >
                                    사용자</button>
                                <Modal
                                    className="MainContent"
                                    isOpen={userOpen}
                                    >
                                    <SignUpBox 
                                        signUp="사용자"
                                        closeModal={closeUserModal}
                                    />
                                </Modal>
                            </div>
                            <div>
                                <div className="joinText">
                                    {registerMessageValue}
                                </div>
                                <div className="joinText">
                                    {borrowMessageValue}
                                </div>
                            </div>
                        </p>
                        <button id="joinButton" onClick={closeJoinModal}>닫기</button>
                </Modal>
            </div>
            <div className="footer">
                <div className="blog">
                    <img src={blogIcon} className="blogImg"/>
                </div>
                <div className="kakao">
                    <img src={kakaoIcon} className="kakaoImg"/>
                </div>
            </div>
        </>

    )
}
