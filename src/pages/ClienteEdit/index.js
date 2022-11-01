import React, { useEffect, useState} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Nav,Navbar,Form,Table,Button} from 'react-bootstrap'
import InputMask from 'react-input-mask';
import api from '../../services/api';

export default function ClienteEdit(){    

    const [id,setId] = useState(null);
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
    const [filialId, setFilialId] = useState(0);

    
    
    const{clienteId} = useParams(); 
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    
    const authorization = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    
  useEffect(()=>{
      loadCliente();    
  },clienteId)  
    

    async function loadCliente(){
      try {
        
        const response = await api.get(`cliente/${clienteId}`, authorization);
        
        setId(response.data.clienteId);
        setNome(response.data.nome);
        setEmail(response.data.email);
        setCelular(response.data.celular);
        setCEP(response.data.cep);
        setCPF(response.data.cpf);
        setLogradouro(response.data.logradouro);
        setNumero(response.data.numero);
        setBairro(response.data.bairro);
        setCidade(response.data.cidade);
        setEstado(response.data.estado);
        setFilialId(response.data.filialId);

      } catch (error) {
        alert(error.response.data)
      }
    }

  async function Atualizar(event)  {
    event.preventDefault();

    const data = {
    clienteId,    
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
      const body = JSON.stringify(data);

    try {
        data.id = clienteId;
        await api.put(`cliente/${id}`,body,config, authorization)
      
      
    } catch (error) {
      alert(error.response.data)
    }
    navigate('/cliente');
  }

  async function logout(){
    try {
        localStorage.clear();
        localStorage.setItem('token','');
        authorization.headers = '';
        navigate('/');

    } catch (error) {
        alert('Não foi possivel fazer o logout' + error)
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
                            <label for="form_name">ClienteId</label>
                            <input id="form_name" type="text" name="clienteId" class="form-control" 
                            placeholder="Id" 
                            value={id}
                            onChange= {e => setId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_lastname">Nome</label>
                            <input id="form_lastname" type="text" name="nome" class="form-control"
                            placeholder="Por favor, insira seu nome" required="required" data-error="Name is required."
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
                        placeholder="Por favor, insira seu celular" as={InputMask} mask="(99)99999-9999" required="required" data-error="Valid phone number is required."
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
                            placeholder="Por favor, insira seu nome CPF" as={InputMask} mask="999.999.999-99" required="required" data-error="Valid CPF is required."
                            value={cpf}
                            onChange= {e => setCPF(e.target.value)}
                            />
                            
                        </div>
                        
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                        <label for="form_email">CEP</label>
                        <input id="form_email" type="text" name="CEP" class="form-control" 
                        placeholder="Por favor, insira seu CEP" as={InputMask} mask="99999-999" required="required" data-error="Valid CEP is required."
                        value={cep}
                        onChange= {e => setCEP(e.target.value)}
                        />
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_email">Logradouro</label>
                            <input id="form_email" type="tex" name="logradouro" class="form-control" 
                            placeholder="Por favor, insira seu Logradouro" required="required" data-error="Valid public place is required."
                            value={logradouro}
                            onChange= {e => setLogradouro(e.target.value)}
                            />
                            
                        </div>
                        
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                        <label for="form_email">Número</label>
                        <input id="form_email" type="text" name="numero" class="form-control" 
                        placeholder="Por favor, insira seu número" required="required" data-error="Valid number is required."
                        value={numero}
                        onChange= {e => setNumero(e.target.value)}
                        />
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_email">Bairro</label>
                            <input id="form_email" type="text" name="bairro" class="form-control" 
                            placeholder="Por favor, insira seu bairro" required="required" data-error="Valid district is required."
                            value={bairro}
                            onChange= {e => setBairro(e.target.value)}
                            />
                            
                        </div>
                        
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                        <label for="form_email">Cidade</label>
                        <input id="form_email" type="text" name="cidade" class="form-control" 
                        placeholder="Por favor, insira sua cidade" required="required" data-error="Valid city is required."
                        value={cidade}
                        onChange= {e => setCidade(e.target.value)}
                        />
                            
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="form_email">Estado</label>
                            <input id="form_email" type="text" name="estado" class="form-control" 
                            placeholder="Por favor, insira seu estado" required="required" data-error="Valid state is required."
                            value={estado}
                            onChange= {e => setEstado(e.target.value)}
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