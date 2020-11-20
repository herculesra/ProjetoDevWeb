import React, { useEffect, useState } from 'react';

import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { FaStar, FaShoppingCart, FaObjectGroup } from 'react-icons/fa';

import './styles.css';
import api from '../../services/api';

const MyCard = ({ cardModel }) => {

    console.log(cardModel);

    const code = cardModel.code;
    const name = cardModel.name;
    const price = cardModel.price;
    const category = cardModel.category;
    const sellingQtt = cardModel.selling_qtt;
    const urlImage = cardModel.url_image;
    const [favority, setFavority] = useState(Boolean(cardModel.favority));
    const [promotion, setPromotion] = useState(Boolean(cardModel.promotion));
    const [inShopping, setInShopping] = useState(Boolean(cardModel.shopping_car));

    const [backGroundUrlImage, setBackGroundUrlImage] = useState(cardModel.url_image);

    const backGroundImage = () => {
        if (urlImage === '') {
            setBackGroundUrlImage(require('./images/default.png'));
        } else if (urlImage.length <= 15) {
            setBackGroundUrlImage(require(`./images/${category}/${urlImage.toLowerCase()}.png`));
        } else {
            setBackGroundUrlImage(urlImage);
        }
    }

    const handleUpdateCard = async (option, boolean) => {
        
        const query = '/giftcard';

        const result = [
            option === 'favority' ? boolean : favority , 
            option === 'shoppingCar' ? boolean : inShopping
        ]
        
        const data = {
            'code': code,
            'name': name,
            'price': price,
            'category': category,
            'selling_qtt': sellingQtt,
            'url_image': urlImage,
            'promotion': promotion,
            'favority': result[0],
            'shopping_car': result[1],
        }
 
        try {
            const res = await api.put(query, data);
            console.log(res)

        } catch (e) {
            console.log('Error: ', e)
        }
    }

    useEffect(() => {
        backGroundImage();
    }, [])


    const handlerFavority = (boolean) => {
        setFavority(boolean);
        handleUpdateCard('favority', boolean);
    }

    const handlerInShopping = (boolean) => {
        setInShopping(boolean);
        handleUpdateCard('shoppingCar', boolean);
    }

    return (
        <React.Fragment>
            <div className="mold-card">
                <div className="mold-card-image">
                    <div style={{ backgroundImage: `url(${backGroundUrlImage})` }}></div>
                    <h2 className="card-name">{name}</h2>
                </div>

                <div className="mold-card-footer">
                    <h2 className="price">R$ <span className="price-color">{price}</span></h2>
                    <div>
                        {
                            inShopping ?    
                                <FaShoppingCart title="In shopping car" size={25} color="#8410b3" className="button" onClick={() => { handlerInShopping(!inShopping) }} />
                                :
                                <span className="shopping-cart"><FiShoppingCart title="No shopping car" size={25} className="button" onClick={() => { handlerInShopping(!inShopping) }} /></span>
                        }
                    </div>
                    <div>
                        {
                            favority ?
                                <FaStar title="favorited" size={25} color="#ffff00" className="button" onClick={() => { handlerFavority(!favority) }} />
                                :
                                <FiStar title="favority" size={25} color="#ffff00" className="button" onClick={() => { handlerFavority(!favority) }} />
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default MyCard;