import React,{useEffect,useState,useRef} from 'react'
import { Col, Form, Row,Button } from 'react-bootstrap'
import { Cash, CreditCard, CurrencyDollar } from 'react-bootstrap-icons'
import { useSelector } from 'react-redux'
const CryptoJS=require("crypto-js")
export default function Calculate() {
    const [Sum, setSum] = useState({total:0})
    const cal = useRef('')
    const [Calculate, setCalculate] = useState(0)
    const count=useSelector((state)=>state.loader)
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('mylist'))!=undefined){
            let arr=JSON.parse(localStorage.getItem('mylist'))
            let a=0;
            arr.forEach(element => {
                var bytesamount = CryptoJS.AES.decrypt(element.amount, 'my-secret-key@123');
                var decryptedDataamount = JSON.parse(bytesamount.toString(CryptoJS.enc.Utf8));
                a=a+parseInt(decryptedDataamount)
            });
            setSum({total:a})
        }
        if(JSON.parse(localStorage.getItem('budget'))!=undefined){
            let budget=JSON.parse(localStorage.getItem('budget'))
            var bytesbudget = CryptoJS.AES.decrypt(budget, 'my-secret-key@123');
            var decryptedDatabudget = JSON.parse(bytesbudget.toString(CryptoJS.enc.Utf8));
            setCalculate(decryptedDatabudget)
        }
        
        
    }, [count])
    const CalculateData=()=>{
        setCalculate(cal.current.value)
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(cal.current.value), 'my-secret-key@123').toString();
        localStorage.setItem('budget',JSON.stringify(ciphertext))

        cal.current.value=''
    }
    return (
        <div>
            <Row className="mt-5 mb-5">
                <Col lg={6} className="p-3 border border-success" >
                    <Form>
                        <Form.Group>
                            <Form.Label className="float-left " style={{color:'green'}}>Please Enter Your Budget</Form.Label>
                            <Form.Control type="text" name="Calculate" ref={cal} />
                        </Form.Group>
                        
                        <Button variant="outline-success" className="float-left mt-2" onClick={CalculateData}>Calculate</Button>
                    </Form>
                </Col>
                <Col lg={6} >
                    <Row>
                        <Col lg={4}>
                            <h3>BUDGET</h3>
                            <Cash size={50}/>
                            <p style={{color:'green',fontSize:'30px'}}><CurrencyDollar size={30}/>{Calculate}</p>
                        </Col>
                        <Col lg={4}>
                            <h3>EXPENSE</h3>
                            <CreditCard size={50}/>
                            <p style={{color:'red',fontSize:'30px'}} ><CurrencyDollar size={30}/>{Sum.total}</p>
                        </Col>
                        <Col lg={4}>
                            <h3>BALANCE</h3>
                            <CurrencyDollar size={50}/>
                            <p style={{color:'green',fontSize:'30px'}}><CurrencyDollar size={30}/>{Calculate-Sum.total}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
