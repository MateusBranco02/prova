import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Times.css';

export default function Times() {
    const [nomeTime, setNomeTime] = useState('');
    const [times, setTimes] = useState([]);
    const [buscarTime, setBuscarTime] = useState([]);

    useEffect(() => {
        buscarTimes();
    }, [])

    const buscarTimes = async () => {
        try {
            const url = `https://api.cartola.globo.com/clubes`;
            const response = await axios.get(url);
            setTimes(Object.values(response.data));
            setBuscarTime(Object.values(response.data));
        } catch (error) {
            console.error('Erro ao buscar dados dos times!', error);
        }
    };

    const filtroTime = () => {
        const timeFiltrado = times.filter(time => time.nome.toLowerCase().includes(nomeTime.toLocaleLowerCase()));
        setBuscarTime(timeFiltrado);
    }

    return (
        <>
            <div className='container'>
                <div className='header'>
                    <img className='logo' src={'https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo.png'} alt="Logo" />
                    <input
                        className='input-buscar'
                        type="text"
                        placeholder='Buscar Time'
                        value={nomeTime}
                        onChange={(time) => setNomeTime(time.target.value)}
                    />
                    <button className='btn-buscar' onClick={filtroTime}>Buscar</button>
                </div>

                <div className='container-times'>
                    <div>
                        <ul>
                            {buscarTime.map((time, key) =>
                                <Link to={`/jogadores/${time.id}`} key={key}>
                                    <li>
                                        <div className='info-times'>
                                            <img src={time.escudos['60x60']} alt={time.nome} />
                                            <div className='descricao'>
                                                <h2>{time.nome}</h2>
                                                <p className='apelido'>{time.apelido}</p>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
