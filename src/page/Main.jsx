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
  const [registerChecked, setRegisterChecked] = React.useState(false)
  const [deleteChecked, setDeleteChecked] = React.useState(false)
  const [returnChecked, setReturnChecked] = React.useState(false)
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

  const onRegisterCheckedHandler = (event) => {
    setRegisterChecked(event.target.checked)
  }

  const onDeleteCheckedHandler = (event) => {
    setDeleteChecked(event.target.checked)
  }

  const onReturnCheckedHandler = (event) => {
    setReturnChecked(event.target.checked)
  }

  const customBoxStyles = {
    content: {
      top: '45%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '20rem',
      height: '30rem',
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
    },
  };

  const columns = [
    { field: 'prodId', headerName: 'ID', width: 150, headerClass:'tableHeader', headerCheckboxSelection: true, checkboxSelection: true },
    { field: 'prodName', headerName: '?????????', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'prodNumber', headerName: '????????????', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'rentalDay', headerName: '??????????????????', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'state', headerName: '????????????', width: 200, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} },
    { field: 'rentalDate', headerName: '????????????', width: 250, headerClass:'tableHeader', cellClass:params => { return 'cellReturn';} }
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
    if(!prodName || !prodNumber || !rentalDay) {
      return alert('????????? ???????????? ??????????????????!');
    }
    else {
      if(registerChecked==true) {
        axios.post('http://localhost:4000/rental/insert', {
        prodName: prodName,
        prodNumber: prodNumber,
        Day: rentalDay
        })
      return alert('?????????????????????:)');
      }
      else {
        return alert('????????? ???????????? ??????????????????!');
      }
    }

  }
    

  const Delete = () => {
    if(!prodId) {
      return alert('????????? ????????? ??????????????????!');
    }
    else {
      if(deleteChecked==true) {
        axios.post('http://localhost:4000/rental/delete', {
        id: prodId
        })
        return alert('?????????????????????:)');
      }
      else {
        return alert('????????? ???????????? ??????????????????!');
      }
    } 
    
  }

  const Return = () => {
    if(!prodId) {
      return alert('????????? ????????? ??????????????????!');
      }
    else {
      if(returnChecked==true) {
        axios.post('http://localhost:4000/rental/trental', {
          num: prodId
        })
        return alert('?????????????????????:)');
      }  
      else {
        return alert('????????? ???????????? ??????????????????!');
      }
    }
  }

  const onClickView = () => {
    axios.get('http://localhost:4000/api/printprod')
        .then((Response)=>{
            setRows(Response.data)
            //console.log(Response.data)
        })
        .catch((Error)=>{console.log(Error)})

    setProdId('');
    setProdName('');
    setProdNumber('');
    setRentDay('');
    setRegisterChecked(false);
    setDeleteChecked(false);
    setReturnChecked(false);
  } 

  
  return(
      <>
        <Header></Header>
        <div className="MainContent">  
          <div className="searchDiv"> 
            <text className="searchTxt">??????:</text>
            <input
              className="searchInput"
              type="text"
              placeholder="?????????"
              value={searchName}
              onChange={onSearchHandler}
            ></input>
            <button className="searchBtn" onClick={ () => Search()}>??????</button>
          </div>
          <button className="returnBtn" onClick={ () => onClickReturn() }>??????</button>
          <Modal
            id="adminReturnModal"
            style={customBoxStyles}
            isOpen={returnOpen}
            >
              <h3>????????????</h3>
              <div className="TxtFDiv">
                <TextField 
                  className="TxtF"
                  label="id"
                  inputProps={{ readOnly: true, }}
                  value={prodId}
                  margin="normal"
                  onChange={onProdIdHandler}
                  />
                <TextField 
                  className="TxtF"
                  label="?????????"
                  inputProps={{ readOnly: true, }}
                  value={prodName}
                  margin="normal"
                  onChange={onNameHandler}
                  />
                <TextField 
                  className="TxtF"                
                  label="????????????"
                  inputProps={{ readOnly: true, }}
                  value={prodNumber}
                  margin="normal"
                  onChange={onNumHandler}/>
                <TextField 
                  className="TxtF"
                  label="????????????"
                  inputProps={{ readOnly: true, }}
                  value={rentalDay}
                  margin="normal"
                  onChange={onDayHandler}
                  />
                <input
                className="detailsCheck"
                type="checkbox"
                checked={returnChecked}
                onChange={onReturnCheckedHandler}
                />?????????????????????????
                <button className="modalBtn" onClick={Return}>??????</button>
                <button className="modalBtn" onClick={closeReturnModal}>??????</button>
            </div>
          </Modal>
          <button className="deleteBtn" onClick={ () => onClickDelete() }>??????</button>
          <Modal
            id="adminDeleteModal"
            style={customBoxStyles}
            isOpen={deleteOpen}
            >
            <h3>????????????</h3>
            <div className="TxtFDiv">
              <TextField 
                className="TxtF"
                label="id"
                inputProps={{ readOnly: true, }}
                value={prodId}
                margin="normal"
                onChange={onProdIdHandler}/>
              <TextField 
                className="TxtF"
                label="?????????"
                inputProps={{ readOnly: true, }}
                value={prodName}
                margin="normal"
                onChange={onNameHandler}
                />
              <TextField 
                className="TxtF"
                label="????????????"
                inputProps={{ readOnly: true, }}
                value={prodNumber}
                margin="normal"
                onChange={onNumHandler}
                />
              <TextField 
                className="TxtF"
                label="????????????"
                inputProps={{ readOnly: true, }}
                value={rentalDay}
                margin="normal"
                onChange={onDayHandler}
                />
              <input
              className="detailsCheck"
              type="checkbox"
              checked={deleteChecked}
              onChange={onDeleteCheckedHandler}
              />?????????????????????????
              <button className="modalBtn" onClick={Delete}>??????</button>
              <button className="modalBtn" onClick={closeDeleteModal}>??????</button>
            </div>
          </Modal>
          <button className="registerBtn" onClick={ () => onClickRegister() }>??????</button>
          <Modal
            id="adminRegisterModal"
            style={customBoxStyles}
            isOpen={registerOpen}
            >
            <h3>????????????</h3>
            <div classname="inputDiv">
              <input
                className="RegisterInput"
                type="text"
                value={prodName}
                placeholder="?????????"
                onChange={onNameHandler}/>
                <input
                  className="RegisterInput"
                  type="text"
                  value={prodNumber}
                  placeholder="????????????"
                  onChange={onNumHandler}/>
                <input
                  className="RegisterInput"
                  type="text"
                  value={rentalDay}
                  placeholder="??????????????????"
                  onChange={onDayHandler}/>
                <input
                  className="detailsCheckr"
                  type="checkbox"
                  checked={registerChecked}
                  onChange={onRegisterCheckedHandler}
                  />?????????????????????????
              </div>
              <button className="modalBtn" onClick={Register}>??????</button>
              <button className="modalBtn" onClick={closeRegisterModal}>??????</button>
          </Modal>
          <button className="viewBtn" onClick={ () => onClickView() }>??????</button>
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