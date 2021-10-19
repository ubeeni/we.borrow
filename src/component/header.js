import React from "react";
import Modal from "react-modal";

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

export default function Header() {
  
    const [helpOpen, setHelpOpen] = React.useState(false)
    const [helpHead] = React.useState("문의사항")
    const [helpMessageValue] = React.useState("tjgus9966@gmail.com")
   
    const openHelpModal = () => {
        setHelpOpen(true);
    }

    const closeHelpModal = () => {
        setHelpOpen(false);
    }

    const onClickHelp = () => {
        openHelpModal();
    }

  return <>
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
  </>;

}