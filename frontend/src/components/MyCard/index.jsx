import React, { useState } from 'react';

import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

import './styles.css';

const MyCard = ({ cardModel }) => {

    console.log(cardModel);

    const code = cardModel.code;
    const name = cardModel.nome;
    const price = cardModel.preco;
    const category = cardModel.categoria;
    const sellingQtt = cardModel.qtd_vendido;
    const urlImage = cardModel.url_image;
    const [favority, setFavority] = useState(cardModel.favorito);
    const [promocao, setPromocao] = useState(cardModel.promocao);
    const [inShopping, setInShopping] = useState(cardModel.shopping_car);

    const backGroundImage = require(`./images/${category}/${name.toLowerCase()}.png`);

    const handlerFavority = (boolean) => {
        setFavority(boolean);
    }

    const handlerInShopping = (boolean) => {
        setInShopping(boolean);
    }

    return (
        <React.Fragment>
            {console.log("renderizou")}
            <h1>Componente de Teste</h1>

            <div className="mold-card">
                <div className="mold-card-image">
                    <div style={{ backgroundImage: `url(${backGroundImage})`}}></div>
                    <h2 className="card-name">{name}</h2>
                </div>

                <div className="mold-card-footer">
                    <h2 className="price">R$ <span className="price-color">{price}</span></h2>
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

export default MyCard;