import React, { useState, useEffect } from 'react';

//RSuite
import { Loader } from 'rsuite';

import './styles.css';

// Components
import Header from '../../components/Header';
import SellingGraph from '../../components/SellingGraph';
import MainHome from '../../components/MainHome';

// Model
import CardModel from '../../model/card-model.js';

//Api
import api from '../../services/api';


const Home = () => {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataApi = async () => {
            setLoading(true);

            const res = await api.get('/giftcard/moresell', {});
   
            setCards(res.data.data.map(e => new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt,  e.url_image)));
            setLoading(false);
        }

        fetchDataApi();
    }, []);

    return (
        <>
            <Header></Header>
            <main className="main-home">
                <MainHome></MainHome>
                <div className="slidershow-home">
                    <h1>Slider</h1>
                </div>
                <div className="graph-home">
                    <h1>Categorias + Vendidas!</h1>
                    {loading ? <Loader /> : <SellingGraph data={cards}></SellingGraph>}
                </div>
            </main>

        </>
    );
}

export default Home;