import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Lista-jogadores.css';

export default function ListaJogadores() {
    const { id } = useParams();
    const [jogadores, setJogadores] = useState([]);
    const [nomeJogador, setNomeJogador] = useState('');

    useEffect(() => {
        listaJogadores(id);
    }, []);

    const listaJogadores = async (id) => {
        try {
            const url = `https://api.cartola.globo.com/atletas/mercado`;
            const response = await axios.get(url);
            const jogadoresTime = response.data.atletas.filter(jogador => jogador.clube_id === parseInt(id));
            const filtroJogador = jogadoresTime.filter(jogador => jogador.apelido.toLowerCase().includes(nomeJogador.toLowerCase()));
            setJogadores(filtroJogador);
        } catch (error) {
            console.error('Erro ao buscar dados dos jogadores!', error);
        }
    };

    return (
        <>
            <input
                type="text"
                placeholder='Buscar Jogador'
                value={nomeJogador}
                onChange={(jogador) => setNomeJogador(jogador.target.value)}
            />

            <button className='btn-buscar' onClick={() => listaJogadores(id)}>Buscar</button>

            <ul>
                {jogadores.map((jogador) => {
                    console.log(jogador.foto);
                    return (

                        <li key={jogador.atleta_id}>
                            <h2>{jogador.apelido}</h2>
                            <img
                                src={jogador.foto
                                    ? jogador.foto?.replace('FORMATO', '220x220')
                                    : 'https://s.sde.globo.com/media/person_role/2023/12/06/photo_220x220_eCO6g7f.png'
                                }
                                alt={jogador.apelido}
                            />

                        </li>
                    );
                })}
            </ul>
        </>
    );
}
