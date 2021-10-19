import React from "react";
import styled from "styled-components";

const StyledModal = styled.div`
    top: 45%;
    left: 50%;
    right: auto;
    bottom: auto;
    marginRight: -50%;
    textAlign: center;
    transform: translate(-50%, -50%);
`;

export default function Modal({Head, MessageValue}) {
  
    // const [modalOpen, setModalOpen] = React.useState(false)

    // const closeModal = () => {
    //     setModalOpen(false);
    // }

  return (
    <Modal
      isOpen={modalOpen}
      style={StyledModal}
      >
        <h2>{Head}</h2>
        <p>{MessageValue}</p>
        {/* <button onClick={closeModal}>닫기</button> */}
    
    </Modal>
  );
}