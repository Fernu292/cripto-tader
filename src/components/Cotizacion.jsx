import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Resultado = styled.div`
    color: white;
    font-family: Arial, Helvetica, sans-serif;
`;

const Info = styled.p`
    font-size: 18px;

    span{
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 30px;

    span{
        font-weight: bold;
    }
`;

const Cotizacion = ({resultado}) => {

    //Comprobar si es un objeto vacio 
    if(Object.keys(resultado).length === 0) return null;

    console.log(resultado);


    return ( 
        <Resultado>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>El precio más alto es: <span>{resultado.HIGHDAY}</span></Info>
            <Info>El precio más bajo es: <span>{resultado.LOWDAY}</span></Info>
            <Info>Variacion en las ultimas 24hrs: <span>{resultado.CHANGEPCT24HOUR}%</span></Info>
            <Info>Ultima actualizacion: <span>{resultado.LASTUPDATE}</span></Info>
        </Resultado>
     );
}

Cotizacion.propTypes = {
    resultado : PropTypes.object.isRequired
}
export default Cotizacion;