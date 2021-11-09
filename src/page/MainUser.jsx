import React, {useState} from "react";
import Modal from "react-modal";
import Header from "../component/header";
import Detail from "../component/detail";
import { AgGridReact } from "ag-grid-react";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

export default function MainUser() {

  const [lentOpen, setLentOpen] = React.useState(false)

  const openLentModal = () => {
    setLentOpen(true);
  }

  const onClickLent = () => {
    openLentModal();
  }

  const closeLentModal = () => {
    setLentOpen(false);
  } 

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
    { field: 'id', headerName: 'ID', width: 130, headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'goods_name', headerName: '물품명', width: 200 },
    { field: 'goods_NO', headerName: '물품번호', width: 200 },
    { field: 'lent_days', headerName: '대여가능일수', width: 200 },
    { field: 'lent_state', headerName: '대여상태', width: 200 },
    { field: 'lent_time', headerName: '대여일시', width: 250 },
  ];

  const rowData = [
    {id: "1", goods_name: "우산", goods_NO: 3, lent_days: "3일", lent_state: "대여가능", lent_time: null},
    {id: "2", goods_name: "보조베터리", goods_NO: 1, lent_days: "5시간", lent_state: "대여중", lent_time: "2019년 4월 12일 15:00"},
    {id: "3", goods_name: "공학계산기", goods_NO: 22, lent_days: "4분", lent_state: "반납대기", lent_time: "2021년 11월 7일 20:43"}
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
          <button className="lentBtn" onClick={ () => onClickLent() }>대여</button>
          <Modal
            id="userLentModal"
            style={customBoxStyles}
            isOpen={lentOpen}
            >
            <Detail 
              title="대여하기" 
              detail="위 내용이 맞습니다." 
              closeModal={closeLentModal}/>  
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