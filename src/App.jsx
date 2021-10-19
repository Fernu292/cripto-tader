import styled from "@emotion/styled";
import imagen from './img/cripto.png';
import { useState, useEffect } from "react";


//Axios para consultas API
import axios from "axios";
import Formulario from "./components/Formulario";
import Cotizacion from "./components/Cotizacion";
import Spiner from "./components/Spiner";


const Contenedor = styled.div`
   max-width: 90%;
   margin: 0 auto;

   @media (min-width: 992px){
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 2rem;
   }

   @media (min-width: 200px) and (max-width: 1200px){
      display: flex;
      flex-direction: column-reverse;
   }
  
`;

const Imagen = styled.img`
   max-width: 100%;
   margin-top: 5rem;
`;

const Heading = styled.h1`
   font-family: 'Bebas Neue', cursive;
   color: white;
   text-align: left;
   font-weight: 700;
   font-size: 50px;
   margin-top: 80px;
   margin-bottom: 50px;

   &::after{
      content: '';
      width: 100px;
      height: 6px;
      background-color: #66A2FE;
      display: block;
   }
`;
const App = () => {

   const [moneda, setMoneda] = useState('');
   const [criptomoneda, setCriptomoneda] = useState('');

   const[resultado, setResultado] = useState({});

   const [load, setLoad] = useState(false);
 
   //use effect para cambios de monedad

   useEffect( ()=>{
      
      const CotizarCripto = async ()=>{
            //evitar ejecucion de la primera ves
         if(moneda === '') return;
         console.log('Cotizando');

         //consulta de API

         const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

         const resultado = await axios.get(url);

         setLoad(true);

         //Ocultar el spiner y mostar resultado 

         setTimeout( ()=>{
            setLoad(false);
            
            //Acceder de forma dinamica a un API result 
            setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
         },2500)

         
      };

      CotizarCripto();

   }, [moneda, criptomoneda]);


  return ( 
     <Contenedor>
        <div>
            <Imagen src = {imagen} alt= 'cripto' />
        </div>


        <div>
            <Heading>Cotiza CriptoCoin</Heading>

            <Formulario 
               setMoneda = {setMoneda}
               setCriptomoneda = {setCriptomoneda}
            />

            {load ? <Spiner /> :<Cotizacion resultado = {resultado} />}
        </div>
     </Contenedor>
   );
}
 
export default App;