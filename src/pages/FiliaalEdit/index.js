import React, { useEffect, useState} from 'react';
import {useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container,Nav,Navbar,Form,Table,Button} from 'react-bootstrap'
import InputMask from 'react-input-mask';
import api from '../../services/api';

export default function FilialEdit(){    

    const [id,setId] = useState(null);
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState(0);
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCEP] = useState('');
    const [cnpj, setCNPJ] = useState('');
    
    
    const{filialId} = useParams(); 
    
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    
    const authorization = {
        headers : {
            authorization : `Bearer ${token}`
        }
    }
    
  useEffect(()=>{
      loadFilial();    
  },filialId)  
    

    async function loadFilial(){
      try {
        
        const response = await api.get(`filial/${filialId}`, authorization);
        
        setId(response.data.filialId);
        setCEP(response.data.cep);
        setCNPJ(response.data.cnpj);
        setLogradouro(response.data.logradouro);
        setNumero(response.data.numero);
        setBairro(response.data.bairro);
        setCidade(response.data.cidade);
        setEstado(response.data.estado);
        
      } catch (error) {
        alert(error.response.data)
      }
    }

  async function Atualizar(event)  {
    event.preventDefault();

    const data = {
    filialId,
    cep,
    cnpj,
    logradouro,
    numero,
    bairro,
    cidade,
    estado,
    }

    const config = {
        headers: {
          "Accept" : 'application/json',  
          "Content-Type" : 'application/json'
          },
        }
      const body = JSON.stringify(data);

    try {
        data.id = filialId;
        await api.put(`filial/${id}`,body,config, authorization)
      
      
    } catch (error) {
      alert(error.response.data)
    }
    navigate('/filial');
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
           <Nav.Link type="button" onClick={logout} >Logout</Nav.Link>                           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    <div class="container">
        <div class=" text-center mt-5 ">
            <h1 >Atualizar Filial</h1>
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
                            <label for="form_name">FilialId</label>
                            <input id="form_name" type="text" name="clienteId" class="form-control" 
                            placeholder="" required="required" data-error="Id is required."
                            value={id}
                            onChange= {e => setId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div class="col-md-6">
                    <div class="form-group">
                        <label for="form_email">CEP</label>
                        <input id="form_email" type="text" name="CEP" class="form-control" 
                        placeholder="Por favor, insira seu CEP" required="required" data-error="Valid CEP is required."
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
                        <label for="form_email">CNPJ</label>
                        <input id="form_email" type="text" name="CNPJ" class="form-control" 
                        placeholder="Por favor, insira seu CNPJ" required="required" data-error="Valid CNPJ is required."
                        value={cnpj}
                        onChange= {e => setCNPJ(e.target.value)}
                        />
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