import React, { useState,useEffect} from 'react'
import styled from '@emotion/styled';
import imagen from './bit.png';
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';

const Contenedor = styled.div`
    max-width:900px;
    margin: 0 auto;
    @media (min-width:992px){
        display:grid;
        grid-template-columns: repeat(2,1fr);
        column-gap: 2rem;
    }
`;
const Imagen = styled.img`
    max-width: 100%;
    max-height: 100%;
    margin-top: 5rem;
`;

const Heading = styled.h1`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-align:left;
    font-wigth:700;
    font-size:50px;
    margin-bottom: 50px;
    margin-top: 80px;

    &::after {
        content:'';
        width:100px;
        height:6px;
        background-color: #009846;
        display:block
    }
`;


export default function App() {

    const [moneda, guardarMoneda] = useState('')
    const [criptomoneda, guardarCripto] = useState('')
    const [resultado, guardarResultado] = useState({});

    useEffect(()=>{
        const cotizarCriptomoneda = async()=>{

            //Evitar la ejecucion
            if(moneda==='')return;
    
            const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
            const resultado = await axios.get(url);
            guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
        }
        cotizarCriptomoneda();
    },[moneda,criptomoneda]);

    return (
        <Contenedor>
            <div>
                <Imagen
                src={imagen}
                alt="Criptocurrency"
                />
            </div>
            <div>
                <Heading>Cryptocurrency Quotes</Heading>
                <Formulario
                    guardarMoneda={guardarMoneda}
                    guardarCripto={guardarCripto}
                />
                <Cotizacion
                resultado={resultado}/>
            </div>

        </Contenedor>
    )
}
