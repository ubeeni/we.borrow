import React, {useState} from "react";
import Modal from "react-modal";
import Header from "../component/header";
import Input from "../component/input";
import ReturnInput from "../component/returnInput";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { TextField } from "../../../Induction/node_modules/@material-ui/core";


export default function Main() {

  const [registerOpen, setRegisterOpen] = React.useState(false)
  const [deleteOpen, setdeleteOpen] = React.useState(false)
  const [returnOpen, setReturnOpen] = React.useState(false)
  const [gridApi,setGridApi] = useState();
  const [colimnApi,setColumnApi] = useState();

  const [goodsName, setGoodsName] = React.useState('')
  const [goodsNO, setGoodsNO] = React.useState('')
  const [rentDays, setRentDay] = React.useState('')

  const openRegisterModal = () => {setRegisterOpen(true);}
  const openDeleteModal = () => {setdeleteOpen(true);}
  const openReturnModal = () => {setReturnOpen(true);}

  const onClickDelete = () => {openDeleteModal(); }
  const onClickReturn = () => {openReturnModal();}

  const closeRegisterModal = () => {setRegisterOpen(false);} 
  const closeDeleteModal = () => {setdeleteOpen(false);} 
  const closeReturnModal = () => {setReturnOpen(false);} 

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  }

  const onNameHandler = (event) => {
    setGoodsName(event.currentTarget.value)
  }

  const onNumHandler = (event) => {
    setGoodsNO(event.currentTarget.value)
  }

  const onDayHandler = (event) => {
    setRentDay(event.currentTarget.value)
  }

  // const onClickSave = () => {
  //   //setSelectValue(gridApi.getSelectedRows()[0].goods_name, gridApi.getSelectedRows()[0].goods_NO, gridApi.getSelectedRows()[0].lent_days);
  //   const data = {
  //     goods_name: gridApi.getSelectedRows()[0].goods_name,
  //     goods_NO: gridApi.getSelectedRows()[0].goods_NO,
  //     lent_days: gridApi.getSelectedRows()[0].lent_days
  //   }
  //   setGoodName(gridApi.getSelectedRows()[0].goods_name)
  //   setGoodNO(gridApi.getSelectedRows()[0].goods_NO)
  //   setLentDay(gridApi.getSelectedRows()[0].lent_days)
  //   openDeleteModal(); 
  // }

  const customBoxStyles = {
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '20rem',
      height: '26rem',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
    },
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 150, headerClass:'tableHeader', headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'goods_name', headerName: '물품명', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'goods_NO', headerName: '물품번호', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'lent_days', headerName: '대여가능일수', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'lent_state', headerName: '대여상태', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'lent_time', headerName: '대여일시', width: 250, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} }
  ];

  const [rowData, setRows] = React.useState([
    {id: "1", goods_name: "우산", goods_NO: 3, rent_days: "3일", rent_state: "대여가능", rent_time: null},
    {id: "2", goods_name: "보조베터리", goods_NO: 1, rent_days: "5시간", rent_state: "대여중", rent_time: "2019년 4월 12일 15:00"},
    {id: "3", goods_name: "공학계산기", goods_NO: 62, rent_days: "4분", rent_state: "반납대기", rent_time: "2021년 11월 7일 20:43"},
    {id: "4", goods_name: "김유빈", goods_NO: 22, rent_days: "365일", rent_state: "대여중", rent_time: "2000년 4월 12일"}
  ]);
   
  const onClickRegister = () => {
    openRegisterModal();

    axios.post('http://localhost:4000/rental/insert', {
      prodName: goodsName,
      prodNumber: goodsNO,
      Day: rentDays
    })
        // .then((Response)=>{
        //     console.log(Response.data[0].checkAdmin)
        // })
        // .catch((Error)=>{console.log(Error)})
    
  }

  const onClickView = () => {
    axios.get('http://localhost:4000/api/printprod')
        .then((Response)=>{
            setRows(Response.data)
            console.log(Response.data)
        })
        .catch((Error)=>{console.log(Error)})
  } 


  
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
              <div className="TxtFDiv">
              <div className="TxtF">{goodsName}</div>
              <div className="TxtF">{goodsNO}</div>
              <div className="TxtF">{rentDays}</div>
              <input
              className="detailsCheck"
              type="checkbox"/>진짜 삭제 할 거야..?
              <button onClick={closeDeleteModal}>삭제</button>
              <button onClick={closeDeleteModal}>닫기</button>
            </div>
          </Modal>
          <button className="deleteBtn" onClick={ () => onClickSave() }>삭제</button>
          <Modal
            id="adminDeleteModal"
            style={customBoxStyles}
            isOpen={deleteOpen}
            >
            <div className="TxtFDiv">
              <div className="TxtF">{goodsName}</div>
              <div className="TxtF">{goodsNO}</div>
              <div className="TxtF">{rentDays}</div>
              <input
              className="detailsCheck"
              type="checkbox"/>진짜 삭제 할 거야..?
              <button onClick={closeDeleteModal}>삭제</button>
              <button onClick={closeDeleteModal}>닫기</button>
            </div>
          </Modal>
          <button className="registerBtn" onClick={ () => onClickRegister() }>등록</button>
          <Modal
            id="adminRegisterModal"
            style={customBoxStyles}
            isOpen={registerOpen}
            >
            <h3>등록하기</h3>
            <div classname="inputDiv">
              <input
                className="RegisterInput"
                type="text"
                value={goodsName}
                placeholder="물품명"
                onChange={onNameHandler}/>
                <input
                  className="RegisterInput"
                  type="text"
                  value={goodsNO}
                  placeholder="물품번호"
                  onChange={onNumHandler}/>
                <input
                  className="RegisterInput"
                  type="text"
                  value={rentDays}
                  placeholder="대여가능일수"
                  onChange={onDayHandler}/>
                <input
                  className="detailsCheck"
                  type="checkbox"/>
              </div>
              <button onClick={onClickRegister}>등록</button>
              <button onClick={closeRegisterModal}>닫기</button>
          </Modal>
          <button className="viewBtn" onClick={ () => onClickView() }>조회</button>
          <div style={{width: '75rem', margin: '10px auto'}}>
            <div className="ag-theme-balham" style={{height: '500px'}}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columns}
                onCellClicked={() => onClickCell()}
                onGridReady={onGridReady}
                suppressMovableColumns={'true'}
              />
            </div>
          </div>
          
        </div>
      </>

  )
  
}