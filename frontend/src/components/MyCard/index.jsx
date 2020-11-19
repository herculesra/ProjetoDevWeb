import React, { useEffect, useState } from 'react';

import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

import './styles.css';

const MyCard = ({ cardModel }) => {

    console.log(cardModel);

    const code = cardModel.code;
    const name = cardModel.name;
    const price = cardModel.price;
    const category = cardModel.category;
    const sellingQtt = cardModel.selling_qtt;
    const urlImage = cardModel.url_image;
    const [favority, setFavority] = useState(cardModel.favority);
    const [promocao, setPromocao] = useState(cardModel.promotion);
    const [inShopping, setInShopping] = useState(cardModel.shopping_car);
    const [backgroundImage, setBackGroundImage] = useState(cardModel.url_image);

    const backGroundImage = () => {
        if (urlImage === '') {
            setBackGroundImage(require('./images/default.png'));
        } else if (urlImage.length <= 15) {
            setBackGroundImage(require(`./images/${category}/${urlImage.toLowerCase()}.png`));
        } else {
            setBackGroundImage(urlImage);
        }
    }

    useEffect(()=>{
        backGroundImage();
    },[])


    const handlerFavority = (boolean) => {
        setFavority(boolean);
    }

    const handlerInShopping = (boolean) => {
        setInShopping(boolean);
    }

    return (
        <React.Fragment>
            <div className="mold-card">
                <div className="mold-card-image">
                    <div style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                    <h2 className="card-name">{name}</h2>
                </div>

                <div className="mold-card-footer">
                    <h2 className="price">R$ <span className="price-color">{price}</span></h2>
                    {
                        inShopping ?
                            <FaShoppingCart title="In shopping car" size={25} color="#8410b3" className="button" onClick={() => { handlerInShopping(!inShopping) }} />
                            :
                            <span className="shopping-cart"><FiShoppingCart title="No shopping car" size={25} className="button" onClick={() => { handlerInShopping(!inShopping) }} /></span>
                    }
                    {
                        favority ?
                            <FaStar title="favorited" size={25} color="#ffff00" className="button" onClick={() => { handlerFavority(!favority) }} />
                            :
                            <FiStar title="favority" size={25} color="#ffff00" className="button" onClick={() => { handlerFavority(!favority) }} />
                    }
                </div>
            </div>
        </React.Fragment>
    );
}

export default MyCard;