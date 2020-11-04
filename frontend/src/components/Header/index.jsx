import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import loukinhoImg from '../../assets/logo/logo3.png';
import textLogoImg from '../../assets/logo/logo4.png';

import './styles.css';

const Header = (props) => {

    return (
        <nav>
            <div className="header-container">
                <img src={loukinhoImg} alt="Loukinho" />
                <img src={textLogoImg} alt="Gift Loucos" />
                <ul>
                    {/* <li><Link to={"/"}>Home</Link></li>
                    <li><Link to={"/favoritos"}>Favoritos</Link></li>
                    <li><Link to={"/carrinho"}>Carrinho</Link></li>
                    <li><Link to={"/cadastro"}>Cadastrar</Link></li>
                    <li><Link to={"/sobre"}>Sobre</Link></li> */}

                    <Link to={"/"}><li>Home</li></Link>
                    <Link to={"/favoritos"}><li>Favoritos</li></Link>
                    <Link to={"/carrinho"}><li>Carrinho</li></Link>
                    <Link to={"/cadastro"}><li>Cadastrar</li></Link>
                    <Link to={"/sobre"}><li>Sobre</li></Link>
                </ul>
            </div>
        </nav>
    );
}

export default Header;