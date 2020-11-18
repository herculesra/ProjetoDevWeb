import React from 'react';

import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

//componentes
import MyCard from '../MyCard';

// Model
import CardModel from '../../model/card-model.js';

//css
import './styles.css';
import { useState } from 'react';

const ComponentTest = () => {
    const cardModel = new CardModel(1, 'Smite', 200, 'jogos', 20, '');
    const [favority, setFavority] = useState(false);
    const [inShopping, setInShopping] = useState(false);
    
    const categoria = "streaming";
    const nome = "youtube";
    const backGroundImage = require(`./images/${categoria}/${nome}.png`);


    const handlerFavority = (boolean) => {
        setFavority(boolean);
    }

    const handlerInShopping = (boolean) => {
        setInShopping(boolean);
    }

    return (
        <React.Fragment>
            <h1>Componente de Teste</h1>

            <MyCard cardModel={cardModel}/>

            <div className="mold-card">
                <div className="mold-card-image">
                    <div style={{ backgroundImage: `url(${backGroundImage})`}}></div>
                    <h2 className="card-name">dead by daylight</h2>
                </div>

                <div className="mold-card-footer">
                    <h2 className="price">R$ <span className="price-color">20,00</span></h2>
                    {
                        inShopping ? 
                        <FaShoppingCart title="In shopping car" size={25} color="#8410b3" className="button" onClick={()=> {handlerInShopping(!inShopping)}}/>
                        :
                        <span className="shopping-cart"><FiShoppingCart title="No shopping car" size={25} className="button" onClick={()=> {handlerInShopping(!inShopping)}} /></span>
                    }
                    {
                        favority ? 
                        <FaStar title="favorited" size={25} color="#ffff00" className="button" onClick={()=> {handlerFavority(!favority)}}/>
                        :
                        <FiStar title="favority" size={25} color="#ffff00" className="button" onClick={()=> {handlerFavority(!favority)}}/>
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default ComponentTest;