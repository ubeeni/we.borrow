import React from "react";
import LoginBox from "../component/loginBox";
import Modal from 'react-modal';
import kakaoIcon from "../img/kakao.png";
import blogIcon from "../img/blog.png";


export default function Login(){

    const [helpOpen, setHelpOpen] = React.useState(false)
    const [joinOpen, setJoinOpen] = React.useState(false)
    const [helpHead] = React.useState("문의사항")
    const [joinHead] = React.useState("회원가입")
    const [helpMessageValue] = React.useState("tjgus9966@gmail.com")
    const [registerMessageValue] = React.useState("등록자가 물품을 등록합니다.")
    const [borrowMessageValue] = React.useState("대여자가 물품을 대여합니다.")

    const openHelpModal = () => {
        setHelpOpen(true);
    }

    const closeHelpModal = () => {
        setHelpOpen(false);
    }

    const openJoinModal = () => {
        setJoinOpen(true);
    }

    const closeJoinModal = () => {
        setJoinOpen(false);
    }

    const onClickHelp = () => {
        openHelpModal();
    }

    const onClickJoin = () => {
        openJoinModal();
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
            <div className="head">
                <div className="headerLogo">
                    <div className="headLogoImg"></div>
                </div>
                <div className="help">
                    <button className="helpImg" onClick={ () => onClickHelp() }></button>
                    <Modal 
                        isOpen={helpOpen} 
                        style={customBoxStyles}
                        >
                            <h2>{helpHead}</h2>
                            <p><i>{helpMessageValue}</i></p>
                            <button onClick={closeHelpModal}>확인</button>
                    </Modal>
                        

                </div>
            </div>
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
                                <button className="joinButton" id="register">등록</button>
                                <button className="joinButton" id="borrow">대여</button>
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
