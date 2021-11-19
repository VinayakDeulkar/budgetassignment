import React from 'react'
import { Col, Container, Row,Navbar,Nav,Button } from 'react-bootstrap'
import AddExpense from './AddExpense'
import Calculate from './Calculate'
import ExpenseList from './ExpenseList'
import { useHistory } from 'react-router'
export default function HomePage() {
    const history=useHistory()
    const Logout=()=>{
        localStorage.clear();
        history.push('/')
    }
    return (
        <div>
            <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Navbar.Brand className='ml-2'>Bugdet Calculator</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                            
                            </Nav>
                            <Nav>
                            <Button onClick={Logout}>LogOut</Button>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
            <Container>  
                <Row>
                    
                    <Col lg={12} sx={12}>
                        <Calculate/>
                    </Col>
                    <Col lg={6} sx={6}>
                        <AddExpense/>
                    </Col>
                    <Col lg={6} sx={6}>
                        <ExpenseList/>
                    </Col>
                </Row> 
            </Container>
        </div>
    )
}
