import React, { useEffect, useState} from 'react';
import { Link, useNavigate, useParams} from "react-router-dom";
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import{FiEdit, FiUserX} from 'react-icons/fi';
import {Container,Nav,Navbar,Form,Table,Button} from 'react-bootstrap'
import {Modal, ModalBody, ModalHeader } from 'reactstrap';
import InputMask from 'react-input-mask';
import api from '../../services/api';
import { GoogleMap, Marker,useJsApiLoader ,} from '@react-google-maps/api';
import './styles.css';
import axios from 'axios';
import Geocode from 'react-geocode';
import geocoder from 'geocoder';



export default function Filial(){  

const [filialId,setFilialId] = useState('');
const [logradouro, setLogradouro] = useState('');
const [numero, setNumero] = useState(0);
const [bairro, setBairro] = useState('');
const [cidade, setCidade] = useState('');
const [estado, setEstado] = useState('');
const [cep, setCEP] = useState('');
const [cnpj, setCNPJ] = useState('');  

const [filiais, setFiliais] = useState([]);
const [modalCadastro, setModalCadastro] = useState(false);

const [search, setSearch] = useState('');
const [coordenadas, setCoordenadas] = useState([]);

const navigate = useNavigate();

const token = localStorage.getItem('token');

const abrirFecharModalCadastro = () => {
    setModalCadastro(!modalCadastro);
}

const filtroCidade = filiais.filter(filial => {
  return filial.cidade.toLowerCase().includes(search.toLowerCase())
})

useEffect(() => {
  api.get('filial', authorization)
  .then(response => {setFiliais(response.data);},token)
  latlng ();
  
},[]);

const authorization = {
  headers : {
      authorization : `Bearer ${token}`
  }
}

async function Cadastrar(event){
  event.preventDefault();
  
    const newUser = {
      logradouro,
      numero,
      bairro,
      cidade,
      estado,
      cep,
      cnpj,
      
    }
    const config = {
      headers: {
        "Accept" : 'application/json',  
        "Content-Type" : 'application/json'
        },
      }
    const body = JSON.stringify(newUser);  
 
  try {
   await api.post(`filial/${filialId}`, body, config)
    .then(() => {
      abrirFecharModalCadastro();
    })
    } catch (error) {
      alert("Não foi possivel cadastrar o usuário.")
    }
    
};

const endereco = []
  for (let i = 0; i < filiais.length; i++){
    endereco.push({
      address: filiais[i].logradouro + ' , ' + filiais[i].numero + ' - ' + filiais[i].bairro +
      ' , ' + filiais[i].cidade + ' - ' + filiais[i].estado + ' , ' + filiais[i].cep
    })
  }

function latlng (event){
  event.preventDefault();

  let finalAddress = endereco.address;

  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${finalAddress}&language=pt-BR&key=AIzaSyBKMAUCLpKRSTSTGccv1rUiI9WoTB_7UWQ`)
  .then(response => {
    let coord = response.data.results[0].geometry.location;
    console.log(response)
    setCoordenadas(coord)
  })
}

async function EditarFilial(id){
 try {
     navigate(`atualizar/${id}`);
} catch (error) {
     alert('Não foi possível editar a filial')
}
}

async function deleteFilial(id,cidade){
  
  try{
     if(window.confirm('Deseja deletar a filial de ' + cidade + ' ?'))
     {
           await api.delete(`filial/${id}`, authorization);
           setFiliais(filiais.filter(filial => filial.filialId !== id));
     }
  }catch(error){
   alert('Não foi possível excluir a filial')
  }
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

const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: "AIzaSyBKMAUCLpKRSTSTGccv1rUiI9WoTB_7UWQ"
})

const positionCenter = {
  lat:-12.700327,
  lng:-38.324224,
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
          
            <Nav.Link href="/cliente">Clientes</Nav.Link>
            <Nav.Link href="/usuario">Usuários</Nav.Link>
            <Nav.Link href="/filial">Filiais</Nav.Link>            
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Procurar por cidade"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            
          </Form>
          <Nav>
           <Nav.Link onClick={() => abrirFecharModalCadastro()}>Cadastrar Filial</Nav.Link>
          </Nav>
          <Nav>
           <Nav.Link type="button" onClick={logout} >Logout</Nav.Link>                           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </nav>
    <div>
    <h1>Relação de Filiais</h1>
    </div>
    <Table striped>
      <thead>
        <tr>
          <th>ID</th>
          <th>Logradouro</th>
          <th>Número</th> 
          <th>Bairro</th>
          <th>Cidade</th>
          <th>Estado</th>
          <th>CEP</th>
          <th>CNPJ</th>
          <th>Editar</th> 
          <th>Exluir</th>                 
        </tr>
      </thead>
      <tbody>
      {filtroCidade.map(filial => (
        <tr key={filial.filialId}>                   
        <td>{filial.filialId}</td>
        <td>{filial.logradouro}</td>
        <td>{filial.numero}</td>  
        <td>{filial.bairro}</td>
        <td>{filial.cidade}</td>
        <td>{filial.estado}</td>
        <td>{filial.cep}</td>
        <td>{filial.cnpj}</td>
        <td>
          <button type="button" onClick={()=> EditarFilial(filial.filialId)}>
            <FiEdit size="25" color="#17202a"/>
            </button>
            </td>
        <td>
          <button type="button" > 
            <FiUserX size="25" color="#17202a" onClick= {()=> deleteFilial(filial.filialId,filial.cidade)} />
            </button>   
        </td>            
        </tr>
        ))} 
      </tbody>
    </Table>
      <Modal isOpen={modalCadastro}>
        <ModalHeader>Cadastrar Filial</ModalHeader>
        <ModalBody>
        <Form onSubmit={Cadastrar}>
        
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>CEP</Form.Label >
        <Form.Control as={InputMask} required mask="99999-999" type="text" placeholder="Informe o CEP" 
        value={cep}
        onChange= {e => setCEP(e.target.value)}
        />
      </Form.Group>   
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Logradouro</Form.Label>
        <Form.Control type="text" required placeholder="Informe o logradouro (Ex: Av./Rua/Caminho)" 
        value={logradouro}
        onChange= {e => setLogradouro(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Número</Form.Label>
        <Form.Control type="text" required placeholder="Informe somente o número (Ex: 01)"
        value={numero}
        onChange= {e => setNumero(e.target.value)}
        />
      </Form.Group> 
      </Form.Group>      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Bairro</Form.Label>
        <Form.Control type="text" required placeholder="Informe o Bairro"
        value={bairro}
        onChange= {e => setBairro(e.target.value)}
        />
        <Form.Text className="text-muted">          
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cidade</Form.Label>
        <Form.Control type="text" required placeholder="Informe a Cidade" 
        value={cidade}
        onChange= {e => setCidade(e.target.value)}
        />
      </Form.Group>  
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Estado</Form.Label>
        <Form.Control type="text" required placeholder="Informe o Estado"
        value={estado}
        onChange= {e => setEstado(e.target.value)}
        />
      </Form.Group> 
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>CNPJ</Form.Label >
        <Form.Control as={InputMask} required mask="99.999.999/9999-99" type="text" placeholder="Informe o CEP" 
        value={cnpj}
        onChange= {e => setCNPJ(e.target.value)}
        />
      </Form.Group>
      <button className="button" type="submit">Confirmar</button>{"   "}
      <button className="button" type="submit"onClick={() => abrirFecharModalCadastro()}>Cancelar</button>
         
    </Form>
        </ModalBody>
      </Modal>  

      <div className='map'>{isLoaded ? (
        <GoogleMap
          mapContainerStyle={{width:'80%', height:'80%'}}
          center={positionCenter}
          zoom={12}>
          {endereco.map(latlng => 
            <Marker position={{
              lat: endereco.lat,
              lng: endereco.lng
            }}/> 
            )}
          
        </GoogleMap>
    ) : ( 
    <></>
    )
    }</div>
      
    </body>
    );
  }