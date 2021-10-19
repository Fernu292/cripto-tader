import { useEffect, useState } from "react";
import PropTypes from 'prop-types';


import styled from "@emotion/styled";

import useMoneda from "../Hooks/useMoneda";
import useCripto from "../Hooks/useCripto";
import axios  from "axios";

import Error from "./Error";

const Boton = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66a2fe;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: white;
    transition: background-color .3s ease;
    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }

    
`;



const Formulario = ({setMoneda, setCriptomoneda}) => {

    //state de cripto

    const [listaCripto, setCripto] = useState([]);
    const [error, setError] = useState(false);

    const MONEDAS = [
        {codigo: 'USD', nombre:'Dolar US'},
        {codigo: 'MXN', nombre:'Peso MXN'},
        {codigo: 'EUR', nombre:'Euro'},
        {codigo: 'GBP', nombre:'Libra Esterlina'}
    ]

    //Usar useMoneda

    const [moneda, SelectMoneda] = useMoneda('Elige tu moneda', '', MONEDAS);

    //Usar useCripto

    const [cripto, SelectCripto] = useCripto('Elige tu Criptomoneda', '', listaCripto);

    ///Ejecutar llamado de API

    useEffect( ()=>{
        const consultarAPI =  async ()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);

            setCripto(resultado.data.Data);
        }

        consultarAPI();
    }, []);

    //Cotizacion de moneda

    const cotizarMoneda =(e)=>{
        e.preventDefault();

        //Validar Formulario 

        if(moneda==='' || moneda==='- Seleccione -'||cripto==='' ||cripto === '- Seleccione -'){
            setError(true); return;
        }
            
        setError(false);
        setMoneda(moneda);
        setCriptomoneda(cripto);
    };


    return ( 
        <form
            onSubmit = {cotizarMoneda}
        >
            {error ? <Error mensaje ='Todos los campos son obligatorios'/> : null}
            <SelectMoneda />

            <SelectCripto />


            <Boton 
                type='submit'
                value='Calcular'
            />
        </form>
     );
}

Formulario.propTypes = {
    setMoneda : PropTypes.func.isRequired,
    setCriptomoneda : PropTypes.func.isRequired
}
export default Formulario;