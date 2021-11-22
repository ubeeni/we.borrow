import React, {useState} from "react";
import Modal from "react-modal";
import Header from "../component/header";
import { AgGridReact } from "ag-grid-react";
import axios from "axios";
import { TextField } from "@mui/material";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


export default function Main() {

  const [registerOpen, setRegisterOpen] = React.useState(false)
  const [deleteOpen, setdeleteOpen] = React.useState(false)
  const [returnOpen, setReturnOpen] = React.useState(false)
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();
  
  const [prodId, setProdId] = React.useState('')
  const [prodName, setProdName] = React.useState('')
  const [prodNumber, setProdNumber] = React.useState('')
  const [rentalDay, setRentDay] = React.useState('')
  const [searchName, setSearchName] = React.useState('')
  //const [selectValue, setSelectValue] = React.useState('')

  const openRegisterModal = () => {setRegisterOpen(true);}
  const openDeleteModal = () => {setdeleteOpen(true);}
  const openReturnModal = () => {setReturnOpen(true);}

  const onClickRegister = () => {openRegisterModal(); }
  const onClickDelete = () => {openDeleteModal(); }
  const onClickReturn = () => {openReturnModal();}

  const closeRegisterModal = () => {setRegisterOpen(false);} 
  const closeDeleteModal = () => {setdeleteOpen(false);} 
  const closeReturnModal = () => {setReturnOpen(false);} 

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  }
  
  const onSearchHandler = (event) => {
    setSearchName(event.currentTarget.value)
  }
  
  const onProdIdHandler = (event) => {
    setProdId(event.currentTarget.value)
  }

  const onNameHandler = (event) => {
    setProdName(event.currentTarget.value)
  }

  const onNumHandler = (event) => {
    setProdNumber(event.currentTarget.value)
  }

  const onDayHandler = (event) => {
    setRentDay(event.currentTarget.value)
  }

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
    { field: 'prodId', headerName: 'ID', width: 150, headerClass:'tableHeader', headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'prodName', headerName: '물품명', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'prodNumber', headerName: '물품번호', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'rentalDay', headerName: '대여가능일수', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'state', headerName: '대여상태', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'rentalDate', headerName: '대여일시', width: 250, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} }
  ];

  const [rowData, setRows] = React.useState([]);

  const getSelectedRowData = () => {
    //setSelectValue(gridApi.getSelectedRows()[0].prodId, gridApi.getSelectedRows()[0].prodName, gridApi.getSelectedRows()[0].prodNumber, gridApi.getSelectedRows()[0].rentalDay);
    // const data = {
    //   prodId: gridApi.getSelectedRows()[0].prodId,
    //   prodName: gridApi.getSelectedRows()[0].prodName,
    //   prodNumber: gridApi.getSelectedRows()[0].prodNumber,
    //   rentalDay: gridApi.getSelectedRows()[0].rentalDay
    // }
    setProdId(gridApi.getSelectedRows()[0].prodId)
    setProdName(gridApi.getSelectedRows()[0].prodName)
    setProdNumber(gridApi.getSelectedRows()[0].prodNumber)
    setRentDay(gridApi.getSelectedRows()[0].rentalDay)
  };

  const Search = () => {
    axios.post('http://localhost:4000/api/search', {
      prodName: searchName
    }).then((Response)=>{
          setRows(Response.data)
          console.log(Response.data)
      })
      .catch((Error)=>{console.log(Error)})
  }

  const Register = () => {
    //if checkbox가 체크되었다면
    axios.post('http://localhost:4000/rental/insert', {
      prodName: prodName,
      prodNumber: prodNumber,
      Day: rentalDay
    })

    return alert('등록되었습니다:)');
  }

  const Delete = () => {
    //if checkbox가 체크되었다면
    axios.post('http://localhost:4000/rental/delete', {
      id: prodId
    })

    return alert('삭제되었습니다:)');
  }

  const Return = () => {
    //if checkbox가 체크되었다면
    axios.post('http://localhost:4000/rental/trental', {
      num: prodId
    })

    return alert('반납되었습니다:)');
  }

  const onClickView = () => {
    axios.get('http://localhost:4000/api/printprod')
        .then((Response)=>{
            setRows(Response.data)
            //console.log(Response.data)
        })
        .catch((Error)=>{console.log(Error)})

    setProdId('')
    setProdName('')
    setProdNumber('')
    setRentDay('')
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
              value={searchName}
              onChange={onSearchHandler}
            ></input>
            <button className="searchBtn" onClick={ () => Search()}>검색</button>
          </div>
          <button className="returnBtn" onClick={ () => onClickReturn() }>반납</button>
          <Modal
            id="adminReturnModal"
            style={customBoxStyles}
            isOpen={returnOpen}
            >
              <div className="TxtFDiv">
                <TextField 
                  className="TxtF"
                  label="id"
                  inputProps={{ readOnly: true, }}
                  value={prodId}
                  onChange={onProdIdHandler}
                  />
                <TextField 
                  className="TxtF"
                  label="물품명"
                  inputProps={{ readOnly: true, }}
                  value={prodName}
                  onChange={onNameHandler}
                  />
                <TextField 
                  className="TxtF"                
                  label="물품번호"
                  inputProps={{ readOnly: true, }}
                  value={prodNumber}
                  onChange={onNumHandler}/>
                <TextField 
                  className="TxtF"
                  label="대여일수"
                  inputProps={{ readOnly: true, }}
                  value={rentalDay}
                  onChange={onDayHandler}
                  />
                <input
                className="detailsCheck"
                type="checkbox"/>반납하시겠습니까?
                <button onClick={Return}>반납</button>
                <button onClick={closeReturnModal}>닫기</button>
            </div>
          </Modal>
          <button className="deleteBtn" onClick={ () => onClickDelete() }>삭제</button>
          <Modal
            id="adminDeleteModal"
            style={customBoxStyles}
            isOpen={deleteOpen}
            >
            <div className="TxtFDiv">
              <TextField 
                className="TxtF"
                label="id"
                inputProps={{ readOnly: true, }}
                value={prodId}
                onChange={onProdIdHandler}/>
              <TextField 
                className="TxtF"
                label="물품명"
                inputProps={{ readOnly: true, }}
                value={prodName}
                onChange={onNameHandler}
                />
              <TextField 
                className="TxtF"
                label="물품번호"
                inputProps={{ readOnly: true, }}
                value={prodNumber}
                onChange={onNumHandler}
                />
              <TextField 
                className="TxtF"
                label="대여일수"
                inputProps={{ readOnly: true, }}
                value={rentalDay}
                onChange={onDayHandler}
                />
              <input
              className="detailsCheck"
              type="checkbox"/>진짜 삭제 할 거야..?
              <button onClick={Delete}>삭제</button>
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
                value={prodName}
                placeholder="물품명"
                onChange={onNameHandler}/>
                <input
                  className="RegisterInput"
                  type="text"
                  value={prodNumber}
                  placeholder="물품번호"
                  onChange={onNumHandler}/>
                <input
                  className="RegisterInput"
                  type="text"
                  value={rentalDay}
                  placeholder="대여가능일수"
                  onChange={onDayHandler}/>
                <input
                  className="detailsCheck"
                  type="checkbox"/>
              </div>
              <button onClick={Register}>등록</button>
              <button onClick={closeRegisterModal}>닫기</button>
          </Modal>
          <button className="viewBtn" onClick={ () => onClickView() }>조회</button>
          <div style={{width: '75rem', margin: '10px auto'}}>
            <div className="ag-theme-balham" style={{height: '500px'}}>
              <AgGridReact
                rowData={rowData}
                columnDefs={columns}
                rowSelection={'single'}
                onGridReady={onGridReady}
                onSelectionChanged={getSelectedRowData}
                suppressMovableColumns={'true'}
              />
            </div>
          </div>
          
        </div>
      </>

  )
  
}