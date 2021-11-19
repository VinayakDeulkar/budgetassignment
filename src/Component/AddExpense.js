import React, { useEffect, useRef,useState } from 'react'
import { Form,Button, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const CryptoJS=require("crypto-js")

export default function AddExpense() {
    const Title = useRef('')
    const Amount = useRef('')
    const [ErrorTitle, setErrorTitle] = useState('')
    const [ErrorAmount, setErrorAmount] = useState('')
    const [updating, setupdating] = useState(false)
    const [decAmount, setdecAmount] = useState('')
    const [ID, setID] = useState('')
    const regForName=RegExp(/[A-Za-z ]+/)
    const regForAmount=RegExp(/[0-9]+/)
    const count=useSelector((state)=>state.loader)
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('updatekey'))!=undefined){
            setupdating(true)
            let arr=JSON.parse(localStorage.getItem('updatekey'))
                var bytesuid = CryptoJS.AES.decrypt(arr.id, 'my-secret-key@123');
                var decryptedDatauid = JSON.parse(bytesuid.toString(CryptoJS.enc.Utf8));
                var bytesutitle = CryptoJS.AES.decrypt(arr.title, 'my-secret-key@123');
                var decryptedDatautitle = JSON.parse(bytesutitle.toString(CryptoJS.enc.Utf8));
                var bytesuamount = CryptoJS.AES.decrypt(arr.amount, 'my-secret-key@123');
                var decryptedDatauamount = JSON.parse(bytesuamount.toString(CryptoJS.enc.Utf8));
            setID(decryptedDatauid)
           
            Title.current.value=decryptedDatautitle
            Amount.current.value=decryptedDatauamount
            setdecAmount(decryptedDatauamount)
        }
        
    }, [count])
    
    
    const handler=(event)=>{
        const name=event.target.name
        switch (name) {
            case 'title':
                    const errorTitle=regForName.test(Title.current.value)?'':"Enter valid name pattern";
                    setErrorTitle(errorTitle)
                break;
            case 'amount':
                    const erroramount=regForAmount.test(Amount.current.value)?'':"Enter valid name pattern";
                    setErrorAmount(erroramount)
                break;
            default:
                break;
        }
    }
    const addData=async()=>{
        if(localStorage.getItem('budget')!=undefined){
                let budget=JSON.parse(localStorage.getItem('budget'))
                var bytesbudget = CryptoJS.AES.decrypt(budget, 'my-secret-key@123');
                var decryptedDatabudget = JSON.parse(bytesbudget.toString(CryptoJS.enc.Utf8));
            if(!updating){
                if(localStorage.getItem('mylist')!=undefined){
                    let array=JSON.parse(localStorage.getItem('mylist'))
                    let a=0;
                    array.forEach(element => {
                        var bytesamount = CryptoJS.AES.decrypt(element.amount, 'my-secret-key@123');
                        var decryptedDataamount = JSON.parse(bytesamount.toString(CryptoJS.enc.Utf8));
                        a=a+parseInt(decryptedDataamount)
                    });
                    let total=a+parseInt(Amount.current.value)
                    let check=false;
                        if(total<=decryptedDatabudget&&parseInt(Amount.current.value)<=decryptedDatabudget){
                            check=true;
                        }
                        else{
                            check=false;
                        }
                    if(Title.current.value!=''&&Amount.current.value!='' && check!=false){
                        let id=Math.random()
                        let title=Title.current.value;
                        let amount=Amount.current.value;
                        
                        var cipherid = CryptoJS.AES.encrypt(JSON.stringify(id), 'my-secret-key@123').toString();
                        var ciphertitle = CryptoJS.AES.encrypt(JSON.stringify(title), 'my-secret-key@123').toString();
                        var cipheramount = CryptoJS.AES.encrypt(JSON.stringify(amount), 'my-secret-key@123').toString();
                        let data={id:cipherid,title:ciphertitle,amount:cipheramount}
                        let arr=[]
                        arr=JSON.parse(localStorage.getItem('mylist'))
                        console.log(arr);
                        arr.push(data)
                         localStorage.setItem('mylist',JSON.stringify(arr))
                        Title.current.value='';
                        Amount.current.value=''
                    }
                    else{
                        alert("Out of budget");
                    }
                }
                else{
                    if(parseInt(Amount.current.value)<=decryptedDatabudget){
                        let arr=[]
                        let id=Math.random()
                        let title=Title.current.value;
                        let amount=Amount.current.value;
                        var cipherid = CryptoJS.AES.encrypt(JSON.stringify(id), 'my-secret-key@123').toString();
                        var ciphertitle = CryptoJS.AES.encrypt(JSON.stringify(title), 'my-secret-key@123').toString();
                        var cipheramount = CryptoJS.AES.encrypt(JSON.stringify(amount), 'my-secret-key@123').toString();
                        let data={id:cipherid,title:ciphertitle,amount:cipheramount}
                        arr.push(data)
                        localStorage.setItem('mylist',JSON.stringify(arr))
                        Title.current.value='';
                        Amount.current.value=''
                    }
                    else{
                        alert('Expense out of budget')
                    }
                    
                }
            }
            else{
                let a=0;
                let array=JSON.parse(localStorage.getItem('mylist'))
                    array.forEach(element => {
                        var bytesamount = CryptoJS.AES.decrypt(element.amount, 'my-secret-key@123');
                        var decryptedDataamount = JSON.parse(bytesamount.toString(CryptoJS.enc.Utf8));
                        a=a+parseInt(decryptedDataamount)
                    });
                    a=a-decAmount
                    let total=a+parseInt(Amount.current.value)
                    let check=false;
                    if(total<=decryptedDatabudget){
                        check=true;
                    }
                    else{
                        check=false;
                    }
                if(Title.current.value!=''&&Amount.current.value!='' && check!=false){
                    let arr=JSON.parse(localStorage.getItem('mylist'))
                    let title=Title.current.value;
                    let amount=Amount.current.value;
                    var ciphertitle = CryptoJS.AES.encrypt(JSON.stringify(title), 'my-secret-key@123').toString();
                    var cipheramount = CryptoJS.AES.encrypt(JSON.stringify(amount), 'my-secret-key@123').toString();
                    arr.forEach(element => {
                        var bytesid = CryptoJS.AES.decrypt(element.id, 'my-secret-key@123');
                        var decryptedDataid = JSON.parse(bytesid.toString(CryptoJS.enc.Utf8));
                        if(decryptedDataid===ID){
                            element.title=ciphertitle;
                            element.amount=cipheramount
                        }
                        else{
                            
                        }
                    }); 
    
                    localStorage.setItem('mylist',JSON.stringify(arr))
    
                    console.log(arr);
                    Title.current.value='';
                    Amount.current.value='';
                    setupdating(false)
                    localStorage.removeItem('updatekey')
                }
                else{
                    alert('Enter valid data to update')
                }
            }
        }
        else{
            alert("Add Budget First")
        }
        
        
    }
    return (
        <div >
            <Row>
                <Col lg={12} className="border border-danger p-3">
                    <Form onSubmit={addData}>
                        <Form.Group>
                                <Form.Label className="float-left " style={{color:'red'}}>Please Enter Your Expense</Form.Label>
                                <Form.Control type="text" name="title" onChange={handler} ref={Title} />
                        </Form.Group>
                        <span className="float-left">{ErrorTitle}</span><br/>
                        <Form.Group>
                                <Form.Label className="float-left " style={{color:'red'}}>Please Enter Expense Amount</Form.Label>
                                <Form.Control type="text" name="amount" onChange={handler} ref={Amount} />
                        </Form.Group>
                        <span className="float-left">{ErrorAmount}</span><br/>
                        {!updating?
                        <Button variant="outline-danger" type='submit' className="float-left mt-2">Add Expense</Button>:
                        <Button variant="outline-danger" type='submit' className="float-left mt-2">Edit Expense</Button>
                        }
                    </Form>
                </Col>
            </Row> 
        </div>
    )
}
