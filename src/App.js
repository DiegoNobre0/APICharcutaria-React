import React from 'react';
import './Global.css';
import { Routes, Route} from 'react-router-dom';
import Home from './pages/PaginaInicial';
import Clientes from './pages/Clientes';
import Filial from './pages/Filiais';
import Usuario from './pages/Usuarios';
import ClienteEdit from './pages/ClienteEdit';
import FilialEdit from './pages/FiliaalEdit';
import UsuarioEdit from './pages/UsuarioEdit';
import Mapa from './pages/Maps';


export default function App() {
  return (
    <>
    <header>
      
    </header>
    <main>
        <Routes>
          <Route path='/' exact element={<Home/>}/>   
          <Route path='/cliente' element={<Clientes/>}/> 
          <Route path='/filial' element={<Filial/>}/> 
          <Route path='/usuario' element={<Usuario/>}/>   
          <Route path='/cliente/atualizar/:clienteId' element={<ClienteEdit/>}/>
          <Route path='/filial/atualizar/:filialId' element={<FilialEdit/>}/>
          <Route path='/usuario/atualizar/:usuarioId' element={<UsuarioEdit/>}/>
          <Route path='/mapa' element={<Mapa/>}/>
        </Routes>
    </main>
    </>
  );
}