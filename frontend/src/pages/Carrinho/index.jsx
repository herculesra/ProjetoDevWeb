import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

//React-suite
import { Loader } from 'rsuite';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer'
import MyCard from '../../components/MyCard';

// Api
import api from '../../services/api';

//Model
import CardModel from '../../model/card-model';

// Styles
import './styles.css';

const Carrinho = () => {
    const [shoppingCar, setShoppingCar] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const handlerBuyCard = () => {
        console.log('funcao de compra')

        try{
            shoppingCar.map( async(card) => {
                const query = '/giftcard';

                const data = {
                    'code': card.code,
                    'name': card.name,
                    'price': card.price,
                    'category': card.category,
                    'selling_qtt': card.selling_qtt + 1,
                    'url_image': card.urlImage,
                    'promotion': card.promotion,
                    'favority': card.favority,
                    'shopping_car': false,
                }
         
                try {
                    await api.put(query, data);
                }catch(e){
                    console.error("Error:",e);
                }
            })
            alert("Muito Obrigado!")
        }catch(e){
            alert("Error ao comprar");
            console.error(e);
        }

        history.push('/');
    }

    useEffect(() => {
        const fetchDataApi = async () => {
            setLoading(true);
            const query = '/giftcard/shoppingCar';
            let priceTotal = 0;

            try {
                const res = await api.get(query);

                setShoppingCar(res.data.data.map(e => {
                    priceTotal += e.price;
                    return new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt, e.url_image)
                }));
            } catch (e) {
                console.log('Error: ', e);
            }

            setTotalPrice(priceTotal);
            setLoading(false);
        }

        fetchDataApi();
    },[]);

    return (
        <React.Fragment>
            <Header selectedOption={"shopping_car"}></Header>
            <main className="main-container">
                {
                    !loading && (shoppingCar.length > 0) ?
                        <div className="main-title">Carrinho de Compras</div>
                        :
                        <div className="main-title">Sem item no Carrinho</div>
                }

                <div className="main-cards">
                    {
                        loading ?
                            <Loader /> :
                            shoppingCar.map(cardModel => <MyCard key={'card' + cardModel.code} cardModel={cardModel} />)
                    }
                </div>

                <div className="main-total">Total: <span>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalPrice)}</span></div>
                <div className="main-buy-container"><button className="main-buy button" onClick={() => handlerBuyCard()}>comprar</button></div>
            </main>
            
            <Footer></Footer>

        </React.Fragment>
    );
}

export default Carrinho;