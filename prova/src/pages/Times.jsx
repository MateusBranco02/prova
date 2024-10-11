import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Times.css';

export default function Times() {
    const [nomeTime, setNomeTime] = useState('');
    const [times, setTimes] = useState([]);

    useEffect(() => {
        buscarTimes();
    }, [])

    const buscarTimes = async () => {
        try {
            const url = `https://api.cartola.globo.com/clubes`;
            const response = await axios.get(url);
            console.log(response.data);
            setTimes(Object.values(response.data));
        } catch (error) {
            console.error('Erro ao buscar dados dos times!', error);
        }
    };

    return (
        <>
            <img className='logo' src={'https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo.png'} alt="Logo" />
            <input
                type="text"
                placeholder='Buscar Time'
                value={nomeTime}
                onChange={(time) => setNomeTime(time.target.value)}
            />
            <button className='btn-buscar' onClick={buscarTimes}>Buscar</button>

            <h1>Times:</h1>

            <ul>
                {times.map((time, key) =>
                    <Link to={`/jogadores/${time.id}`} key={key}>
                        <li>
                            <p>{time.nome}</p>
                        </li>
                    </Link>
                )}
            </ul>
        </>
    );
}
