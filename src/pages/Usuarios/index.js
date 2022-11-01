import React, { useEffect, useState} from 'react';
import { Link, useNavigate, useParams} from "react-router-dom";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{FiEdit, FiUserX} from 'react-icons/fi';
import {Container,Nav,Navbar,Form,Table,Button} from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader } from 'reactstrap';
import InputMask from 'react-input-mask';
import api from '../../services/api';


export default function Usuario(){    

const [usuarioId,setUsuarioID] = useState('');
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [celular, setCelular] = useState('');
const [cpf, setCPF] = useState('');
const [filialId, setFilialId] = useState('');  

const [usuarios,setUsuarios] = useState([])
const [modalCadastro, setModalCadastro] = useState(false);
const [search, setSearch] = useState('');

const navigate = useNavigate();

const token = localStorage.getItem('token');

const abrirFecharModalCadastro = () => {
    setModalCadastro(!modalCadastro);
}

const authorization = {
    headers : {
        authorization : `Bearer ${token}`
    }
}

const filtroNome = usuarios.filter(usuario => {
  return usuario.nome.toLowerCase().includes(search.toLowerCase())
})

useEffect(() => {
  api.get('usuario', authorization).then(
    response => {setUsuarios(response.data);
    },token)
})

async function Cadastrar(event){
  event.preventDefault();
 
    const newUser = {
      nome,
      email,
      celular,
      cpf,
      filialId
    }
    const config = {
      headers: {
        "Accept" : 'application/json',  
        "Content-Type" : 'application/json'
        },
      }
    const body = JSON.stringify(newUser);  
 
  try {
    await api.post(`usuario/${usuarioId}`, body, config)
    .then(() => {
      abrirFecharModalCadastro();
    })
    } catch (error) {
      alert("Não foi possivel cadastrar o usuário.")
    }
    navigate('/usuario');
};

async function EditarUsuario(id){
  try {
      navigate(`atualizar/${id}`);
  } catch (error) {
      alert('Não foi possível editar o usuario')
  }
}

async function deleteUsuario(id,nome){
  
  try{
     if(window.confirm('Deseja deletar ' + nome + ' ?'))
     {
           await api.delete(`usuario/${id}`, authorization);
           setUsuarios(usuarios.filter(usuario => usuario.usuarioId !== id));
     }
  }catch(error){
   alert('Não foi possível excluir o usuario')
  }
}

async function logout(){
  try {
      localStorage.clear();
      localStorage.setItem('token','');
      authorization.headers = '';
      navigate('/');

  } catch (error) {
      alert('Não foi possievl fazer o logout' + error)
  }
}  
return (      
  <body>  
  <nav>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Nobre Charcutaria</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          
            <Nav.Link href="/cliente">Clientes</Nav.Link>
            <Nav.Link href="/usuario">Usuários</Nav.Link>
            <Nav.Link href="/filial">Filiais</Nav.Link>            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Procurar por usuário"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
          </Form>
          <Nav>
           <Nav.Link onClick={() => abrirFecharModalCadastro()}>Cadastrar Usuário</Nav.Link>
          </Nav>
          <Nav>
           <Nav.Link type="button" onClick={logout} >Logout</Nav.Link>                           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </nav>
    <div>
    <h1>Relação de Usuário</h1> 
    </div>

              
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>  
          <th>Celular</th>       
          <th>CPF</th>
          <th>Filial</th>
          <th>Editar</th> 
          <th>Exluir</th>                 
        </tr>
      </thead>
      <tbody>
        {filtroNome.map( usuario => (
          <tr key={usuario.usuarioId}>
          <td>{usuario.usuarioId}</td>
          <td>{usuario.nome}</td>
          <td>{usuario.email}</td>
          <td>{usuario.celular}</td>
          <td>{usuario.cpf}</td>
          <td>{usuario.filialId}</td>
          <td>
            <button type="button">
              <FiEdit size="25" color="#17202a" onClick={()=> EditarUsuario(usuario.usuarioId)}/>
              </button>
          </td>
          <td>
          <button type="button" > 
              <FiUserX size="25" color="#17202a" onClick= {()=> deleteUsuario(usuario.usuarioId,usuario.nome)} />
              </button>
          </td>           
          </tr> 
        ))}
        </tbody>
    </Table> 
      <Modal isOpen={modalCadastro}>
        <ModalHeader>Cadastrar Usuario</ModalHeader>
        <ModalBody>
        <Form onSubmit={Cadastrar}>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Nome</Form.Label >
        <Form.Control  type="text" placeholder="Informe o nome"
        value={nome} 
        onChange= {e => setNome(e.target.value)}
        />
      </Form.Group>   
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Informe o email"
        value={email} 
        onChange= {e => setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Celular</Form.Label>
        <Form.Control as={InputMask} mask="(99)99999-9999" type="text" placeholder="Informe o celular" 
        value={celular} 
        onChange= {e => setCelular(e.target.value)}
        />
      </Form.Group> 
      </Form.Group>      
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>CPF</Form.Label>
        <Form.Control as={InputMask} mask="999.999.999-99" type="text" placeholder="Informe o Bairro"
        value={cpf} 
        onChange= {e => setCPF(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label htmlFor="disabledSelect">Filial</Form.Label>
        <Form.Select id="disabledSelect"
        value={filialId} 
        onChange= {e => setFilialId(e.target.value)}>
            <option>Selecione</option>
            <option value="1">Camaçari</option>
            <option value="2">Lauro de Freitas</option>
        </Form.Select>
        </Form.Group> 
        <button className="btn">Confirmar</button>{"   "}
          <button className="btn" onClick={() => abrirFecharModalCadastro()}>Cancelar</button>
         </Form>
        </ModalBody>
      </Modal>  
      </body>
    
    
    );
  }