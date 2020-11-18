import React, { useState, useEffect } from 'react';

//RSuite
import { Loader } from 'rsuite';

import './styles.css';

// Components
import MyCard from '../../components/MyCard';
import Header from '../../components/Header';
import SellingGraph from '../../components/SellingGraph';

// Model
import CardModel from '../../model/card-model.js';

//Api
import api from '../../services/api';


const Home = (props) => {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataApi = async () => {
            setLoading(true);

            const res = await api.get('/giftcard', {});
            setCards(res.data.dados);
            
            setLoading(false);
        }

        fetchDataApi();
    }, []);

    return (
        <>
            <Header></Header>
            <main className="main-home">
                {loading ? <Loader /> :
                    cards.map(e => {
                        const cardModel = new CardModel(e.codigo, e.nome, e.preco, e.categoria, e.qtd_vendido, e.url_image);

                        return <MyCard key={"MyCard" + e.codigo} cardModel={cardModel}></MyCard>
                    })}
                <div className="slidershow-home">
                    <h1>Slider</h1>
                </div>
                <div className="graph-home">
                    <h1>Gráfico De Estatísticas</h1>
                    {loading ? <Loader /> : <SellingGraph data={cards}></SellingGraph>}
                </div>
            </main>

        </>
    );
}

export default Home;