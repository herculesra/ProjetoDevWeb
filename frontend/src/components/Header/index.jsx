import React, {useState, useEffect} from 'react';

import loukinhoImg from '../../assets/logo/logo3.png';
import textLogoImg from '../../assets/logo/logo4.png';

import './styles.css';

const Header = (props) => {

    return (
        <div className="header-container">
            <img src={loukinhoImg} alt="Loukinho"/>
            <img src={textLogoImg} alt="Texto da Logo"/>
            <ul>
                <li>Home</li>
                <li>Favoritos</li>
                <li>Carrinho</li>
                <li>Cadastrar</li>
                <li>Sobre</li>
            </ul>
        </div>
    );
}

export default Header;