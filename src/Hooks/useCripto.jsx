import { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`;
const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 1rem;
    border: none;
    font-size: 1.2rem;
`;
const useCripto = (label, stateInicial, Opciones)=>{

    //State del custom hook

    const [state, actualizarState] = useState(stateInicial);

    const SelectCripto = ()=>(
        <Fragment>
            <Label>{label}</Label>

            <Select
                onChange ={ e => actualizarState(e.target.value)}
                value ={ state }
            >

                <option>- Seleccione -</option>
                {
                    Opciones.map( ({CoinInfo})=>(
                        <option 
                        key ={CoinInfo.Id}
                        value={CoinInfo.Name}
                        >{CoinInfo.FullName}</option>
                    ))
                }
            </Select>
        </Fragment>
    );

    //Retornar state, interfaz y fn que modifica el state

    return [state, SelectCripto, actualizarState];
}

export default useCripto;