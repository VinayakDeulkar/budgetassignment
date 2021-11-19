import React,{useRef,useState} from 'react'
import { Col, Row,Container, Card, Form,Button } from 'react-bootstrap'
import {BrowserRouter as Router,Link, useHistory } from 'react-router-dom'
import CardHeader from 'react-bootstrap/esm/CardHeader'
import axios from 'axios'
const client=axios.create({
    baseURL:"http://localhost:3001/data"
})
export default function Register() {
    const Name = useRef('')
    const LastName = useRef('');
    const Username = useRef('');
    const Email = useRef('');
    const Password = useRef('');
    const ConfirmPassword = useRef('');
    const regForEmail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    const regForPassword=RegExp(/[A-Za-z0-9 $ @ % &]{8}/);
    const regForName=RegExp(/[A-Za-z ]+/)
    const [ErrorName, setErrorName] = useState('');
    const [ErrorLastName, setErrorLastName] = useState('');
    const [Errorusername, setErrorusername] = useState('')
    const [ErrorEmail, setErrorEmail] = useState('')
    const [ErrorPass, setErrorPass] = useState('');
    const [ErrorConfirm, setErrorConfirm] = useState('')
    const history=useHistory()
    const handler=(event)=>{
        const name=event.target.name;
        switch (name) {
            case 'Username':
                const eu=regForName.test(Username.current.value)?'':"Enter valid email pattern"
                setErrorusername(eu)
                break;
            case 'name':
                const en=regForName.test(Name.current.value)?'':"Enter valid name pattern"
                setErrorName(en)
                break;
            case 'lastname':
                const el=regForName.test(LastName.current.value)?'':"Enter valid name pattern"
                setErrorLastName(el)
                break;
            case 'email':
                    const ee=regForEmail.test(Email.current.value)?'':"Enter valid name pattern"
                    setErrorEmail(ee)
                    break;
            case 'Password':
                const ep=regForPassword.test(Password.current.value)?'':"Enter Valid password pattern"
                setErrorPass(ep)
                break;
            case 'ConfirmPassword':
                const ecp=Password.current.value==ConfirmPassword.current.value?'':'Password must be same';
                setErrorConfirm(ecp)
                break;
            default:
                break;
        }

    }
    const Register=()=>{
        if(Name.current.value!=undefined && Email.current.value!=undefined && LastName.current.value!=undefined && Password.current.value!=undefined && ConfirmPassword.current.value!=undefined && Username.current.value!=undefined ){
            let formData={id:Math.random(),username:Username.current.value,email:Email.current.value,name:Name.current.value,lastname:LastName.current.value,password:Password.current.value}
            console.log(formData);
            client.post('/',formData)
            history.push("/")
        }
    }
    const Loginpage=()=>{
        history.push("/")
    }
    return (
        <div>
            <Router>
            <Container fluid style={{backgroundColor:"whitesmoke"}}>
                <Row>
                    <Col sm={7} md={7} lg={7} xs={7}>
                    <img src="../Images/Datacollect.jpg" style={{ width: "100%" }} />
                    </Col>
                    <Col sm={5} md={5} lg={5} xs={5} style={{textAlign:"center",marginTop:"30px"}}>
                        <Card>
                            <CardHeader>Register</CardHeader>
                            <Card.Body>
                                <Form>
                                    <Form.Group>
                                        <Form.Label className="float-left "> Name</Form.Label>
                                        <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handler} ref={Name} />
                                    </Form.Group>
                                    <span className="red">{ErrorName}</span><br/>
                                    <Form.Group>
                                        <Form.Label className="float-left "> Last Name</Form.Label>
                                        <Form.Control type="text" name="lastname" placeholder="Enter Last Name" onChange={handler} ref={LastName}  />
                                    </Form.Group>
                                    <span className="red">{ErrorLastName}</span><br/>
                                    <Form.Group>
                                        <Form.Label className="float-left "> Username</Form.Label>
                                        <Form.Control type="text" name="Username" placeholder="Enter Username" onChange={handler} ref={Username} />
                                    </Form.Group>
                                    <span className="red">{Errorusername}</span><br/>
                                    <Form.Group>
                                        <Form.Label className="float-left "> Email</Form.Label>
                                        <Form.Control type="text" name="email" placeholder="Enter Email" onChange={handler} ref={Email}  />
                                    </Form.Group>
                                    <span className="red">{ErrorEmail}</span><br/>
                                    <Form.Group>
                                        <Form.Label className="float-left "> Password</Form.Label>
                                        <Form.Control type="password" name="Password" placeholder="Enter Password" onChange={handler} ref={Password}  />
                                    </Form.Group>
                                    <span className="red">{ErrorPass}</span><br/>
                                    <Form.Group>
                                        <Form.Label className="float-left ">Confirm Password</Form.Label>
                                        <Form.Control type="password" name="ConfirmPassword" placeholder="Enter Confirm Password" onChange={handler} ref={ConfirmPassword}  />
                                    </Form.Group>
                                    <span className="red">{ErrorConfirm}</span><br/>
                                    <Form.Group>
                                        <Button variant="primary" onClick={Register} className="mb-2">
                                           Register
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                            <label>Already Have account? <span onClick={Loginpage} ><Link to='/'> Login</Link></span> </label>
                        </Card>
                    </Col>

                </Row>
            </Container>
            </Router>
        </div>
    )
}
