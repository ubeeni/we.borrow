import React, {useState} from "react";
import Modal from "react-modal";
import Header from "../component/header";
import { AgGridReact } from "ag-grid-react";
import { TextField } from "@mui/material";
import axios from "axios";

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';



export default function MainUser() {

  const [rentOpen, setRentOpen] = React.useState(false)
  const [searchName, setSearchName] = React.useState('')
  const [userId, setUserId] = React.useState()
  const [prodId, setProdId] = React.useState('')
  const [prodName, setProdName] = React.useState('')
  const [prodNumber, setProdNumber] = React.useState('')
  const [rentalDay, setRentDay] = React.useState('')
  const [gridApi, setGridApi] = useState();
  const [columnApi, setColumnApi] = useState();

  const openRentModal = () => {
    setRentOpen(true);
  }

  const onClickRent = () => {
    openRentModal();
  }

  const closeRentModal = () => {
    setRentOpen(false);
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

  const onGridReady = (params) => {
    setGridApi(params.api);
    setColumnApi(params.columnApi);
  }

  const getSelectedRowData = () => {
    setProdId(gridApi.getSelectedRows()[0].prodId)
    setProdName(gridApi.getSelectedRows()[0].prodName)
    setProdNumber(gridApi.getSelectedRows()[0].prodNumber)
    setRentDay(gridApi.getSelectedRows()[0].rentalDay)
  };

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

  const Search = () => {
    axios.post('http://localhost:4000/api/search', {
      prodName: searchName
    }).then((Response)=>{
          setRows(Response.data)
          console.log(Response.data)
      })
      .catch((Error)=>{console.log(Error)})
  }

  const Rent = () => {
    //if checkbox가 체크되었다면
    axios.get('http://localhost:4000/api/tempUser')
        .then((Response)=>{
            setUserId(Response.data[0].userId)
            console.log(Response.data[0].userId)
            console.log(userId)
            axios.post('http://localhost:4000/rental/startrental', {
              id: userId,
              num: prodId
            })
        })
        .catch((Error)=>{console.log(Error)})

    

    return alert('대여되었습니다:)\n대여물품 수령은 학생회관으로 와주세요!');
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
            <button className="searchBtn" onClick={ () => Search() }>검색</button>
          </div>
          <button className="lentBtn" onClick={ () => onClickRent() }>대여</button>
          <Modal
            id="userLentModal"
            style={customBoxStyles}
            isOpen={rentOpen}
            >
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
                type="checkbox"/>대여하시겠습니까?
                <button onClick={Rent}>대여</button>
                <button onClick={closeRentModal}>닫기</button>
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
               suppressMovableColumns={'true'}/>
            </div>
          </div>
          
        </div>
      </>

  )
  
}