import React, { useEffect,useState} from 'react'
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda';
import useCryptomoneda from '../hooks/useCryptomoneda';
import axios from 'axios';
import Error from './Error';

const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:18px;
    padding:10px;
    background-color: #34bc6c;
    border: none;
    width: 100px;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;
    &:hover {
        background-color: #069c4c;
        cursor:pointer;
    }
`;



const Formulario=({guardarMoneda,guardarCripto})=> {

    //state del listado
    const [listaCripto,guardarCriptomonedas]= useState([]);
    const [error,guardarError] = useState(false);
    const MONEDAS = [
        {codigo:'BRL',nombre:'Brazilian Real'},
        {codigo:'CAD',nombre:'Canadian Dollar'},
        {codigo:'CLP',nombre:'Chilean Peso'},
        {codigo:'COP',nombre:'Colombian Peso'},
        {codigo: 'EUR', nombre:'Euro'},
        {codigo: 'MXN', nombre:'Mexican Peso'},
        {codigo: 'GBP', nombre:'Pound Sterling'},
        {codigo: 'USD', nombre:'US Dollar'},
    ]

    //Utilizar mi custom hook
    const [moneda,SelectMonedas] = useMoneda('Choice Currency','',MONEDAS);

    //Utilizar cryptomoneda
    const [criptomoneda, SelectCripto] = useCryptomoneda('Choice Criptocurrency','',listaCripto);

    useEffect(()=>{
        const consultarAPI = async ()=>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    },[]);
    const cotizarMoneda = e =>{
        e.preventDefault();
        if(moneda ===''|| criptomoneda ===''){
            guardarError(true);
            return;
        }
        guardarError(false);
        guardarMoneda(moneda);
        guardarCripto(criptomoneda);
    }
    return (
        <form
        onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="All fields are required"/>:null}
            <SelectMonedas />
            <SelectCripto/>
            <Boton
                type="submit"
                value="Calculate"
            />
        </form>
    );
}
export default Formulario;
