import React, { useEffect, useState} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Nav,Navbar,Form,Table,Button} from 'react-bootstrap'
import InputMask from 'react-input-mask';
import api from '../../services/api';

export default function UsuarioEdit(){    

    const [id,setId] = useState(null);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [cpf, setCPF] = useState('');
    const [filialId, setFilialId] = useState(0);

    
    
    const{usuarioId} = useParams(); 
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    
    const authorization = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    
  useEffect(()=>{
      loadUsuario();    
  }, usuarioId)  
    

    async function loadUsuario(){
      try {
        
        const response = await api.get(`usuario/${usuarioId}`, authorization);
        
        setId(response.data.usuarioId);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCelular(response.data.celular);
        setCPF(response.data.cpf);
        setFilialId(response.data.filialId);

      } catch (error) {
        alert(error.response.data)
      }
    }

  async function Atualizar(event)  {
    event.preventDefault();

    const data = {
    usuarioId,    
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
      const body = JSON.stringify(data);

    try {
        data.id = usuarioId;
        await api.put(`usuario/${id}`,body,config, authorization)
      
      
    } catch (error) {
      alert(error.response.data)
    }
    navigate('/usuario');
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
          <Nav>
           <Nav.Link type="button" onClick={logout}>Logout</Nav.Link>                           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <div class="container">
        <div class=" text-center mt-5 ">
            <h1 >Atualizar Cliente</h1>
        </div>
    <div class="row ">
      <div class="col-lg-7 mx-auto">
        <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
            <div class = "container">
            
            <form onSubmit={Atualizar} id="contact-form" role="form">
            <div class="controls">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_name">UsuarioId</label>
                            <input id="form_name" type="text" name="clienteId" class="form-control" 
                            placeholder="" 
                            value={id}
                            onChange= {e => setId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_lastname">Nome</label>
                            <input id="form_lastname" type="text" name="nome" class="form-control"
                            placeholder="Por favor, insira seu nome" required="required" data-error="Lastname is required."
                            value={nome}
                            onChange= {e => setNome(e.target.value)}
                             />
                          </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_email">Email</label>
                            <input id="form_email" type="email" name="email" class="form-control" 
                            placeholder="Por favor, insira seu email" required="required" data-error="Valid email is required."
                            value={email}
                            onChange= {e => setEmail(e.target.value)}
                            />
                        </div>
                        
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                        <label for="form_email">Celular</label>
                        <input id="form_email" type="text" name="celular" class="form-control" 
                        placeholder="Por favor, insira seu celular" required="required" data-error="Valid email is required."
                        value={celular}
                        onChange= {e => setCelular(e.target.value)}
                        />
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                    <div class="form-group">
                            <label for="form_email">CPF</label>
                            <input id="form_email" type="text" name="CPF" class="form-control" 
                            placeholder="Por favor, insira seu nome CPF" required="required" data-error="Valid email is required."
                            value={cpf}
                            onChange= {e => setCPF(e.target.value)}
                            />
                            
                        </div>
                        </div>
                    <div class="col-md-6">
                        <div class="form-group">
                        <Form.Label htmlFor="disabledSelect">Filial</Form.Label>
                        <Form.Select id="disabledSelect" 
                        value={filialId} 
                        onChange= {e => setFilialId(e.target.value)}>
                        <option >Selecione</option>
                        <option value="1">Camaçari</option>
                        <option value="2">Lauro de Freitas</option>
                        </Form.Select>  
                            
                        </div>
                    </div>
                </div>
                <br></br>
                <div class="row">
                    <div class="col-md-12">
                    <button className="button" type="submit">Atualizar</button>{"   "}
                    <button className="button" type="submit">Cancelar</button>
                </div>
                </div>
        </div>
         </form>
        </div>
            </div>
    </div>
    </div>
</div>
</div>
    
    </body>
    );
}