import React, {useEffect, useState} from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import './styles.css';
import Filial from '../Filiais';
import axios from 'axios';
import api from '../../services/api';
import { createPath } from 'react-router-dom';


export default function Mapa(){


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


const [customLat, setCustomLat] = useState([]);
const [customLng, setCustomLng] = useState([]);

useEffect(() => {
  api.get('filial')
  .then(response => {setFiliais(response.data);},[]) 
  
  
});
 
const { isLoaded } = useJsApiLoader({
  id: 'google-map-script',
  googleMapsApiKey: "AIzaSyBKMAUCLpKRSTSTGccv1rUiI9WoTB_7UWQ"
})

const positionCenter = {
  lat:-12.700327,
  lng:-38.324224,
}    

const address = filiais.map((item) => {
  return{
    Endereço: item.logradouro + ' , ' + item.numero + ' - ' + item.bairro +
    ' , ' + item.cidade + ' - ' + item.estado + ' , ' + item.cep
  }
})

console.log(address);

async function getGeocode (){
  let finalAddress = address.Endereço

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${finalAddress}&language=pt-BR&key=AIzaSyBKMAUCLpKRSTSTGccv1rUiI9WoTB_7UWQ`

  console.log(url)

 const response = await axios.get(url)
 const data = response.data.results[0]
 const coords = {
  position: {
   lat: data.geometry.location.lat,
   lng: data.geometry.location.lng
  }
 }
  return coords
}


return (
      <div className='map'>{isLoaded ? (
        <GoogleMap
          mapContainerStyle={{width:'80%', height:'80%'}}
          center={positionCenter}
          zoom={12}>
          <Marker position={positionCenter}/> 
        </GoogleMap>
    ) : ( 
    <></>
    )
    }</div>





  )
}


