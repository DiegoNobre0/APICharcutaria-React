import React, { useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{FiEdit, FiUserX} from 'react-icons/fi';
import {Container,Nav,Navbar,Form,Table,Button} from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader } from 'reactstrap';
import InputMask from 'react-input-mask';
import api from '../../services/api';



export default function Clientes(){    

const [clienteId,setClienteID] = useState('');
const [nome, setNome] = useState('');
const [email, setEmail] = useState('');
const [celular, setCelular] = useState('');
const [cep, setCEP] = useState('');
const [cpf, setCPF] = useState('');
const [logradouro, setLogradouro] = useState('');
const [numero, setNumero] = useState(0);
const [bairro, setBairro] = useState('');
const [cidade, setCidade] = useState('');
const [estado, setEstado] = useState('');
const [filialId, setFilialId] = useState('');

const [clientes,setCliente]= useState([]);
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

const filtroNome = clientes.filter(cliente => {
  return cliente.nome.toLowerCase().includes(search.toLowerCase())
})


useEffect(() => {
  api.get('cliente', authorization).then(
    response => {setCliente(response.data);
    },token)
});


async function Cadastrar(event){
  event.preventDefault();
 
    const newUser = {
      nome,
      email,
      celular,
      cep,
      cpf,
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
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
    
    await api.post(`cliente/${clienteId}`, body, config)
    .then(() => {
      abrirFecharModalCadastro();
    })
    
   
    } catch (error) {
     
      alert("Não foi possivel cadastrar o cliente.")

    }
    navigate('/cliente');
};


async function EditarCliente(id){
  try {
      navigate(`atualizar/${id}`);
  } catch (error) {
      alert('Não foi possível editar o cliente')
  }
}

async function deleteCliente(id,nome){
  
  try{
     if(window.confirm('Deseja deletar ' + nome + ' ?'))
     {
           await api.delete(`cliente/${id}`, authorization);
           setCliente(clientes.filter(cliente => cliente.clienteId !== id));
     }
  }catch(error){
   alert('Não foi possível excluir o cliente')
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
    <nav id='menu'>
     <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Nobre Charcutaria</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/cliente" >Clientes</Nav.Link>
            <Nav.Link href="/usuario">Usuários</Nav.Link>
            <Nav.Link href="/filial">Filiais</Nav.Link>            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Procurar por nome"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
          <Nav>
           <Nav.Link onClick={() => abrirFecharModalCadastro()}>Cadastrar Cliente</Nav.Link>                           
          </Nav>
          <Nav>
           <Nav.Link type="button" onClick={logout} >Logout</Nav.Link>                           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </nav> 
     <div>
     <h1>Relação de Clientes </h1>
      </div>
    <Table striped>
      <thead>
        <tr >            
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>  
          <th>Celular</th>
          <th>CPF</th>
          <th>CEP</th>
          <th>Logradouro</th>
          <th>Número</th>
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>Filial</th>
          <th>Editar</th> 
          <th>Exluir</th>
        </tr>
      </thead>
      <tbody>
        {filtroNome.map(cliente => (
        <tr key={cliente.clienteId}>                   
        <td>{cliente.clienteId}</td>
        <td>{cliente.nome}</td>
        <td>{cliente.email}</td>  
        <td>{cliente.celular}</td>
        <td>{cliente.cpf}</td>
        <td>{cliente.cep}</td>
        <td>{cliente.logradouro}</td>
        <td>{cliente.numero}</td>
        <td>{cliente.bairro}</td>
        <td>{cliente.cidade}</td>
        <td>{cliente.estado}</td>
        <td>{cliente.filialId}</td>
        <td>
          <button type="button" onClick={()=> EditarCliente(cliente.clienteId)}>
            <FiEdit size="25" color="#17202a"/>
            </button>
        </td>
        <td>    
          <button type="button" > 
            <FiUserX size="25" color="#17202a" onClick= {()=> deleteCliente(cliente.clienteId,cliente.nome)} />
            </button>   
        </td>            
        </tr>
        ))}      
        </tbody>
    </Table> 
    

      <Modal isOpen={modalCadastro}>
        <ModalHeader>Cadastrar Cliente</ModalHeader>
        <ModalBody >
        <Form onSubmit={Cadastrar}>
      <Form.Group className="mb-3" controlId="ClienteCadastroNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control type="text" placeholder="Informe o nome" 
        value={nome}
        onChange= {e => setNome(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="ClienteCadastroCelular">
        <Form.Label>Celular</Form.Label>
        <Form.Control as={InputMask} mask="(99)99999-9999" type="text" placeholder="Informe o número" 
        value={celular}
        onChange= {e => setCelular(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="ClienteCadastroCPF">
        <Form.Label>CPF</Form.Label>
        <Form.Control as={InputMask} mask="999.999.999-99" type="text" placeholder="Informe o CPF"
        value={cpf}
        onChange= {e => setCPF(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="ClienteCadastroEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Informe o Email" 
        value={email}
        onChange= {e => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ClienteCadastroCEP">
        <Form.Label>CEP</Form.Label >
        <Form.Control as={InputMask} mask="99999-999" type="text" placeholder="Informe o CEP"
        value={cep}
        onChange= {e => setCEP(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ClienteCadastroLogradouro">
        <Form.Label>Logradouro</Form.Label>
        <Form.Control type="text" placeholder="Informe o logradouro (Ex: Av./Rua/Caminho)" 
        value={logradouro}
        onChange= {e => setLogradouro(e.target.value)}
        />
      </Form.Group>  
      <Form.Group className="mb-3" controlId="ClienteCadastroNomeNumero">
        <Form.Label>Número</Form.Label>
        <Form.Control type="text" placeholder="Informe somente o número (Ex: 01)" 
        value={numero}
        onChange= {e => setNumero(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ClienteCadastroBairro">
        <Form.Label>Bairro</Form.Label>
        <Form.Control type="text" placeholder="Informe o Bairro" 
        value={bairro}
        onChange= {e => setBairro(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="ClienteCadastroNomeCidade">
        <Form.Label>Cidade</Form.Label>
        <Form.Control type="text" placeholder="Informe a Cidade"
        value={cidade}
        onChange= {e => setCidade(e.target.value)}
        />
      </Form.Group>      
      <Form.Group className="mb-3" controlId="ClienteCadastroEstado">
        <Form.Label>Estado</Form.Label>
        <Form.Control type="text" placeholder="Informe o Estado"
        value={estado}
        onChange= {e => setEstado(e.target.value)}
         />
      </Form.Group> 
      <Form.Group className="mb-3">
        <Form.Label htmlFor="disabledSelect">Filial</Form.Label>
        <Form.Select id="disabledSelect" 
        value={filialId} 
        onChange= {e => setFilialId(e.target.value)} >
            <option>Selecione</option>
            <option value="1">Camaçari</option>
            <option value="2">Lauro de Freitas</option>
        </Form.Select>
        </Form.Group>
        <button className="button" type="submit" >Cadastrar</button>{"   "}
         <button className="button" type="submit" onClick={() => abrirFecharModalCadastro()}>Cancelar</button>
    </Form>
        </ModalBody>
        </Modal>  
        </body>
    
    
    );
  }