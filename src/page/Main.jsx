import React, {useState} from "react";
import Modal from "react-modal";
import Header from "../component/header";
import Input from "../component/input";
import ReturnInput from "../component/returnInput";
import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


export default function Main() {

  const [registerOpen, setRegisterOpen] = React.useState(false)
  const [deleteOpen, setdeleteOpen] = React.useState(false)
  const [returnOpen, setReturnOpen] = React.useState(false)

  const openRegisterModal = () => {setRegisterOpen(true);}
  const openDeleteModal = () => {setdeleteOpen(true);}
  const openReturnModal = () => {setReturnOpen(true);}

  const onClickRegister = () => {openRegisterModal();}
  const onClickDelete = () => {openDeleteModal();}
  const onClickReturn = () => {openReturnModal();}

  const closeRegisterModal = () => {setRegisterOpen(false);} 
  const closeDeleteModal = () => {setdeleteOpen(false);} 
  const closeReturnModal = () => {setReturnOpen(false);} 

  const customBoxStyles = {
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '35rem',
      height: '30rem',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
    },
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150, headerClass:'tableHeader', headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'goods_name', headerName: '물품명', width: 200, headerClass:'tableHeader' },
    { field: 'goods_NO', headerName: '물품번호', width: 200, headerClass:'tableHeader' },
    { field: 'lent_days', headerName: '대여가능일수', width: 200, headerClass:'tableHeader' },
    { field: 'lent_state', headerName: '대여상태', width: 200, headerClass:'tableHeader' },
    { field: 'lent_time', headerName: '대여일시', width: 250, headerClass:'tableHeader' }
  ];

  const rowData = [
    {id: "1", goods_name: "우산", goods_NO: 3, lent_days: "3일", lent_state: "대여가능", lent_time: null},
    {id: "2", goods_name: "보조베터리", goods_NO: 1, lent_days: "5시간", lent_state: "대여중", lent_time: "2019년 4월 12일 15:00"},
    {id: "3", goods_name: "공학계산기", goods_NO: 62, lent_days: "4분", lent_state: "반납대기", lent_time: "2021년 11월 7일 20:43"},
    {id: "4", goods_name: "김유빈", goods_NO: 22, lent_days: "365일", lent_state: "대여중", lent_time: "2000년 4월 12일"}
  ]
    
  return(
      <>
        <Header></Header>
        <div className="MainContent">  
          <div className="searchDiv"> 
            <text className="searchTxt">검색:</text>
            <input
              className="searchInput"
              type="text"
              placeholder="물품명"
            ></input>
            <button className="searchBtn">검색</button>
          </div>
          <button className="returnBtn" onClick={ () => onClickReturn() }>반납</button>
          <Modal
            id="adminReturnModal"
            style={customBoxStyles}
            isOpen={returnOpen}
            >
            <ReturnInput
              title="반납하기"
              detail="위 내용이 맞습니다."
              closeModal={closeReturnModal}/>
          </Modal>
          <button className="deleteBtn" onClick={ () => onClickDelete() }>삭제</button>
          <Modal
            id="adminDeleteModal"
            style={customBoxStyles}
            isOpen={deleteOpen}
            >
            <Input 
              title="삭제하기" 
              detail="진짜로 삭제 할 거야..?" 
              closeModal={closeDeleteModal}/>  
          </Modal>
          <button className="registerBtn" onClick={ () => onClickRegister() }>등록</button>
          <Modal
            id="adminRegisterModal"
            style={customBoxStyles}
            isOpen={registerOpen}
            >
            <Input 
              title="등록하기" 
              detail="위 내용이 맞습니다." 
              closeModal={closeRegisterModal}/>  
          </Modal>
          <div style={{width: '75rem', margin: '10px auto'}}>
            <div className="ag-theme-balham" style={{height: '500px'}}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columns}
                suppressMovableColumns={'true'}
              />
            </div>
          </div>
          
        </div>
      </>

  )
  
}