import React, { useState, useEffect } from 'react';

//RSuite
import { Loader } from 'rsuite';

import './styles.css';

// Components
import MyCard from '../../components/MyCard';
import Header from '../../components/Header';

// Model
import CardModel from '../../model/card-model.js';

//Api
import api from '../../services/api';


const Home = (props) => {

    const [cards, setCards] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(false);

        const fetchDataApi = async () => {
            const res = await api.get('/giftcard', {});
            setCards(res.data.dados);
        }

        fetchDataApi();

        setLoad(true);
    }, []);

    return (
        <>
            <Header></Header>
            <main className="main-home">
                {load ?
                    cards.map(e => {
                        const cardModel = new CardModel(e.codigo, e.nome, e.preco, e.categoria, e.qtd_vendido);

                        return <MyCard key={"MyCard" + e.codigo} cardModel={cardModel}></MyCard>
                    }): <Loader />}
                <div className="slidershow-home">
                    <h1>Slider</h1>
                </div>
                <div className="graph-home">
                    <h1>Gráfico De Estatísticas</h1>
                </div>
            </main>

        </>
    );
}

export default Home;