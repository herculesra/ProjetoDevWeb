import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import loukinhoImg from '../../assets/logo/logo3.png';
import textLogoImg from '../../assets/logo/logo4.png';

import './styles.css';

const Header = (props) => {

    return (
        <div className="header-container">
            <div>
                <img src={loukinhoImg} alt="Loukinho" />
                <img src={textLogoImg} alt="Gift Loucos" />
            </div>
            <nav>
                <ul>
                    <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/favoritos"}>Favoritos</Link></li>
                    <li><Link to={"/carrinho"}>Carrinho</Link></li>
                    <li><Link to={"/cadastro"}>Cadastrar</Link></li>
                    <li><Link to={"/sobre"}>Sobre</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;