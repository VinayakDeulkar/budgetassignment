import React,{useState,useEffect,useRef} from 'react'
import { Card, Col, Container, Form, Modal, Row,Button } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {BrowserRouter as Router, Link,useHistory } from 'react-router-dom'
import axios from 'axios'
const client=axios.create({
    baseURL:"http://localhost:3001/Data"
})
export default function Login() {
    const [UserData, setUserData] = useState({Userdata:[]})
    const [open, setopen] = useState(false)
    const [EmailError, setEmailError] = useState('')
    const [PasswordError, setPasswordError] = useState('')
    const Email = useRef('')
    const Password = useRef('')
    const history=useHistory()
    const regForEmail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    const regForPassword=RegExp(/[A-Za-z0-9 $ @ % &]{8}/);
    const [Forms, setForms] = useState(false)
    useEffect(async() => {
        try{
            const res=await client.get();
            console.log(res.data);
            setUserData({Userdata:res.data})
            
        }
        catch(err){
            console.log(err);
        }
    }, [])
  const  componentClicked = () => {
        console.log("facebook btn clicked")
    }
  const  responseFacebook = (response) => {
        console.log(response);
        if(response!=undefined){
            setopen(true)
            setTimeout(() => {
                history.push('/HomePage')
            }, 3000);
            
        }
    }
    const handler=(event)=>{
        const name=event.target.name;
        console.log(name);
        switch (name) {
            case 'email':
                const eu=regForEmail.test(Email.current.value)?'':"Enter valid email pattern"
                setEmailError(eu)
                break;
            case 'password':
                const ep=regForPassword.test(Password.current.value)?'':"Enter Valid password pattern"
                console.log(ep);
                setPasswordError(ep)
                break;
            default:
                break;
        }
    }
    const submit=()=>{
        if(EmailError==''&&PasswordError=='' &&Email.current.value!='' && Password.current.value){
            UserData.Userdata.forEach(element=>{
                if(element.email===Email.current.value&& element.password===Password.current.value){
                    setopen(true)
                    history.push("/HomePage")
                }
            })
        }
        else{
            alert('enter valid data')
        }
    }
    const register=()=>{
        history.push('/Register')
    }
    const Loginemail=()=>{
        setForms(true)
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
        <>
        <Router>
            <Container fluid style={{backgroundColor:"whitesmoke"}}>
               
                <Row>
                    <Col sm={7} md={7} lg={7} xs={7}>
                        <img src="../Images/Datacollect.jpg" style={{ width: "100%" }} />
                    </Col>
                    <Col sm={5} md={5} lg={5} xs={5} style={{textAlign:"center",marginTop:"100px"}}>
                    <Row>
                        <h3>Budget Calculator</h3>
                    <h4 className="my-3 mb-5">Login to countinue....</h4>
                    
                </Row>
                <Row>
                        <FacebookLogin
                            appId="646810399643283"
                            autoLoad={true}
                            fields="name,picture"
                            onClick={componentClicked}
                            callback={responseFacebook}
                        />
                        <Col sm={12} md={12} lg={12} xs={12} className="text-center mt-3 mb-3">OR</Col>
                        <Col sm={3} md={3} lg={3} xs={3}/>
                        <Col className="m-4" sm={5} md={5} lg={5} xs={5}>
                            <Button variant="outline-dark" onClick={Loginemail} style={{width:'100%'}}>Login With Email</Button>
                        
                        </Col>
                        </Row>
                        <label>Don't Have account? <span onClick={register} ><Link to='/Register'> Create One</Link></span> </label>
                    </Col>
                    
                </Row>
                {Forms?
                <Modal
                show={Forms}
                onHide={() => setForms(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header className="modalcolor  text-center "  closeButton >
                <Modal.Title id="contained-modal-title-vcenter" style={{marginLeft:"44%"}}  className="text-center " >
                            Login
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                        <Form>
                            <Form.Group  className="mb-2" controlId="frombasicEMail">
                                    <Form.Label className="float-left "> Email</Form.Label>
                                    <Form.Control type="text" name="email" placeholder="Enter Email" onChange={handler} ref={Email} />
                            </Form.Group>
                            <span className="red">{EmailError}</span><br/>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className="float-left ">Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" onChange={handler} ref={Password} />
                            </Form.Group>
                            <span className="red">{PasswordError}</span><br/>
                            
                        </Form>
                </Modal.Body>
                <Modal.Footer className="modalcolor" >
                    <Button variant="dark" style={{marginRight:"45%"}}  onClick={submit}>Submit</Button>{' '}
                </Modal.Footer>
                </Modal>
                :''
                }
            </Container>
            <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message="Logging in "
                    action={action}
                />
            </Router>
        </>
    )
}
