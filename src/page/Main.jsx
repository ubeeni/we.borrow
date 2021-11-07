import React, {useState} from "react";
import Modal from "react-modal";
import Header from "../component/header";
import {AgGridColumn, AgGridReact} from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';


export default function Main() {

  const rowData = [
    {id: "1", 물품명: "우산", 물품번호: 3, 대여가능일수: "3일", 대여상태: "대여가능"},
    {id: "2", 물품명: "보조베터리", 물품번호: 1, 대여가능일수: "5시간", 대여상태: "대여중", 대여일시: "2019년 4월 12일 15:00"},
    {id: "3", 물품명: "공학계산기", 물품번호: 22, 대여가능일수: "4분", 대여상태: "반납대기", 대여일시: "2021년 11월 7일 20:43"}
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
          <button className="returnBtn">반납</button>
          <button className="deleteBtn">삭제</button>
          <button className="registerBtn">등록</button>
          <div style={{width: '1300px', margin: '10px auto'}}>
            <div className="table" style={{height: '500px'}}>
            <AgGridReact  
              rowData={rowData}
              suppressMovableColumns={true}
              >
               <AgGridColumn 
               field="id"
               headerCheckboxSelection="true"
               checkboxSelection="true"
               ></AgGridColumn>
               <AgGridColumn field="물품명"></AgGridColumn>
               <AgGridColumn field="물품번호"></AgGridColumn>
               <AgGridColumn field="대여가능일수"></AgGridColumn>
               <AgGridColumn field="대여상태"></AgGridColumn>
               <AgGridColumn field="대여일시"></AgGridColumn>
            </AgGridReact>
            </div>
          </div>
          
        </div>
      </>

  )
  
}