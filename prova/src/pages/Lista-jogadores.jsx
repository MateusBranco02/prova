import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function ListaJogadores() {
    const { id } = useParams();
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        listaJogadores(id);
    }, []);

    const listaJogadores = async (id) => {
        try {
            const url = `https://api.cartola.globo.com/atletas/pontuados/${id}`;
            const response = await axios.get(url);
            console.log(response.data);
            setJogadores(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados dos jogadores!', error);
        }
    };

    return (
        <>
            <h1>Lista Jogadores:</h1>
        </>
    );
}
