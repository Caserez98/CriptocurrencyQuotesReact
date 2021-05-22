import React from 'react'
import styled from '@emotion/styled'

const ResultadoDiv =styled.div`
    color:#FFF;
    font-family:Arial,Helvetica,sans-serif;
`;
const Info =styled.p`
    font-size:18px;
    span{
        font-weight:bold;
    }
`;
const Precio =styled.p`
    font-size:30px;
`;




const Cotizacion=({resultado}) =>{
    if(Object.keys(resultado).length ===0) return null;
    return (
        <ResultadoDiv>
            <Precio>The price is: <span>{resultado.PRICE}</span></Precio>
            <Info>The higher price of the day is: <span>{resultado.HIGHDAY}</span></Info>
            <Info>The lower price of the day is: <span>{resultado.LOWDAY}</span></Info>
            <Info>Shift in 24 Hrs: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Last Update: <span>{resultado.LASTUPDATE}</span></Info>



        </ResultadoDiv>

    );
}
export default Cotizacion;