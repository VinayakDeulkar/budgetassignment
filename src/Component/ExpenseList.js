import React,{useEffect, useState} from 'react'
import { Col, Row, Table,Button } from 'react-bootstrap'
import { PencilSquare, Trash } from 'react-bootstrap-icons'
import { useDispatch } from 'react-redux'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const CryptoJS=require("crypto-js")
export default function ExpenseList() {
    const [ExpenseList, setExpenseList] = useState({Data:''})
    const [message, setmessage] = useState('')
    const [open, setopen] = useState(false)
    const dispatch=useDispatch()
    useEffect(() => {
        let arr=[]
        arr=JSON.parse(localStorage.getItem('mylist'))
        let data=[]
        if(localStorage.getItem('mylist')!=undefined){
            arr.forEach(element => {
                var bytesid = CryptoJS.AES.decrypt(element.id, 'my-secret-key@123');
                var decryptedDataid = JSON.parse(bytesid.toString(CryptoJS.enc.Utf8));
                var bytestitle = CryptoJS.AES.decrypt(element.title, 'my-secret-key@123');
                var decryptedDatatitle = JSON.parse(bytestitle.toString(CryptoJS.enc.Utf8));
                var bytesamount = CryptoJS.AES.decrypt(element.amount, 'my-secret-key@123');
                var decryptedDataamount = JSON.parse(bytesamount.toString(CryptoJS.enc.Utf8));
                let store={id:decryptedDataid,title:decryptedDatatitle,amount:decryptedDataamount}
                data.push(store)
            });
            setExpenseList({
                Data:data
            })
        }
        
    }, [])
    const update=(key)=>{
        ExpenseList.Data.forEach(element => {
            if(element.id===key){
                var cipheruid = CryptoJS.AES.encrypt(JSON.stringify(element.id), 'my-secret-key@123').toString();
                var cipherutitle = CryptoJS.AES.encrypt(JSON.stringify(element.title), 'my-secret-key@123').toString();
                var cipheruamount = CryptoJS.AES.encrypt(JSON.stringify(element.amount), 'my-secret-key@123').toString();
                let data={id:cipheruid,title:cipherutitle,amount:cipheruamount}
                localStorage.setItem('updatekey',JSON.stringify(data))
                setmessage('Updating value')
                setopen(true)
                    setTimeout(() => {
                        dispatch({type:'ExpenseList'})
                    }, 1000);
            }
        });
    }
    const deleteData=(key)=>{
        console.log(key);
        let arr=ExpenseList.Data.filter(todo=>todo.id!==key)
        let array=[]
        arr.forEach(element => {
            var cipherid = CryptoJS.AES.encrypt(JSON.stringify(element.id), 'my-secret-key@123').toString();
            var ciphertitle = CryptoJS.AES.encrypt(JSON.stringify(element.title), 'my-secret-key@123').toString();
            var cipheramount = CryptoJS.AES.encrypt(JSON.stringify(element.amount), 'my-secret-key@123').toString();
            let data={id:cipherid,title:ciphertitle,amount:cipheramount}
            array.push(data)
        });
        localStorage.setItem('mylist',JSON.stringify(array))
        setExpenseList({Data:arr})
        setmessage('Expenese Deleted')
        setopen(true)
        setTimeout(() => {
            dispatch({type:'ExpenseList'})
        }, 1000);
        
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setopen(false);
      };
    const action = (
        <React.Fragment>
          
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );
    return (
        <div>
           <Row>
               <Col lg={12}>
                   <Table>
                       <thead>
                           <tr>
                               <th>Expense Title</th>
                               <th>Expense Value</th>
                               <th></th>
                           </tr>
                       </thead>
                       <tbody>
                           {
                              ExpenseList.Data && ExpenseList.Data.map((ele)=>
                                   <tr key={ele.id}>
                                       <td>{ele.title}</td>
                                       <td>{ele.amount}</td>
                                       <td>
                                           <Button variant='outline-primary' onClick={()=>update(ele.id)}><PencilSquare/></Button>
                                           <Button variant='outline-danger' onClick={()=>deleteData(ele.id)}><Trash/></Button>
                                       </td>
                                   </tr>
                                )
                           }
                       </tbody>
                   </Table>
               </Col>
               <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
           </Row>
        </div>
    )
}
