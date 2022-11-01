import React, { useState } from 'react';
import api from '../../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import {Container,Nav,Navbar,Form} from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader } from 'reactstrap';





export default function Home() {    



const [email, setEmail] = useState('');
const [password, setPassword] = useState(''); 


const [emailReg, setEmailReg] = useState('');
const [passwordReg, setPasswordReg] = useState('');
const [confirmPassword,setConfirmPassword] = useState('');

const navigate = useNavigate();


const [modalLogin, setModalLogin] = useState(false);
const [modalCadastro, setModalCadastro] = useState(false);


const abrirFecharModalLogin = () => {
    setModalLogin(!modalLogin);
}

const abrirFecharModalCadastro = () => {
    setModalCadastro(!modalCadastro);
}

async function login(event){
    event.preventDefault();

    const data = {
      email, password
    };

    try {

      const response = await api.post('autoriza/login',data)

      localStorage.setItem('email',email);
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('expiration', response.data.expiration)

      navigate('/cliente');

    } catch (error) {
      
      alert('O login falhou ' + error)

    }
    navigate('/cliente');
}

async function register(event){
  event.preventDefault();

  if (passwordReg !== confirmPassword){
    alert("Passwords não são iguais");
  }
  else{
    const newUser = {
      emailReg,
      passwordReg, 
      confirmPassword
    }
    const config = {
      headers: {
          "Content-Type": 'application/json',
          "Accept" : 'application/json'
        },
      }
    const body = JSON.stringify(newUser);  
 
  try {

    await api.post('Autoriza/Register', body, config)
    .then(() => {
      navigate('/');
    })
  
    } catch (error) {
      
      alert('O registro falhou ' + error)

    }
  }
};

return (      
    
    <div id='menu'>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href='/' >Nobre Charcutaria</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
                   
          </Nav>
          <Nav>
          <Nav.Link onClick={() => abrirFecharModalCadastro()}>Cadastrar</Nav.Link>
          <Nav.Link onClick={() => abrirFecharModalLogin()}>Login</Nav.Link>            
          </Nav>
        </Navbar.Collapse>
      </Container>      
    </Navbar>
    
    <Modal isOpen={modalLogin}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody>
        <Form onSubmit={login}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"
        value={password}
        onChange={e=>setPassword(e.target.value)}
        />
      </Form.Group> 
        <button class="button" type="submit" >Login</button>{"   "}
        <button className="btn" onClick={() => abrirFecharModalLogin()}>Cancelar</button>
             
      </Form>
      </ModalBody>
      </Modal> 
      

      <Modal isOpen={modalCadastro}>
        <ModalHeader>Cadastrar novo acesso</ModalHeader>
        <ModalBody>
        <Form onSubmit={register}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
        value={emailReg}
        onChange={e=>setEmailReg(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        value={passwordReg}
        onChange={e=>setPasswordReg(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Password Confirm</Form.Label>
        <Form.Control type="password" placeholder="Passwordconfirm" 
        value={confirmPassword}
        onChange={e=>setConfirmPassword(e.target.value)}
        />
      </Form.Group> 
      <button class="button" type="submit">Cadastrar</button>{"   "}
      <button className="btn" onClick={() => abrirFecharModalCadastro()}>Cancelar</button>          
    </Form>
      </ModalBody>
      
      </Modal>  
    </div>    
    
    );
  }