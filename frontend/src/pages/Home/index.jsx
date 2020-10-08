import React, { useState, useEffect } from 'react';

import './styles.css';

// Components
import MyCard from '../../components/MyCard';
import Header from '../../components/Header';

//Api
import api from '../../services/api';


const Home = (props) => {

    const [cards, setCards] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(async () => {
        setLoad(false);

        const res = await api.get('/giftcard', {});
        setCards(res.data.dados);

        setLoad(true);
    }, []);

    return (
        <>
            <Header></Header>
            {load ?
                cards.map(e =>
                        <MyCard
                            nome={e.nome}
                            preco={e.preco}
                            categoria={e.categoria}
                            qtd_vendido={e.qtd_vendido}
                            key={"MyCard" + e.codigo}
                        ></MyCard>)
                
               : null}
        </>
    );
}

export default Home;