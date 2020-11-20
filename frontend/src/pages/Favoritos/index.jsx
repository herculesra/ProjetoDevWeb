import React, { useState, useEffect } from 'react';

//React-suite
import { Loader } from 'rsuite';

// Components
import Header from '../../components/Header';
import MyCard from '../../components/MyCard';

// Api
import api from '../../services/api';

//Model
import CardModel from '../../model/card-model';

// Styles
import './styles.css';

const Favoritos = () => {

    const [favoritesCards, setFavoritesCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDataApi = async () => {
            setLoading(true);
            const query = '/giftcard/favorites';

            try {
                const res = await api.get(query);

                setFavoritesCards(res.data.data.map(e => new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt, e.url_image)));
            } catch (e) {
                console.log('Error: ', e);
            }

            setLoading(false);
        }

        fetchDataApi();
    }, []);

    return (
        <React.Fragment>
            <Header></Header>
            <main className="main-container">
                {
                    !loading && (favoritesCards.length > 0) ? 
                    <div className="main-title">Cards Favoritos</div> 
                    :
                    <div className="main-title">Nenhum Favorito</div>
                }

                <div className="main-cards">
                    {
                        loading ?
                            <Loader /> :
                            favoritesCards.map(cardModel => <MyCard key={'card' + cardModel.code} cardModel={cardModel} />)
                    }
                </div>
            </main>
        </React.Fragment>
    );
}

export default Favoritos;