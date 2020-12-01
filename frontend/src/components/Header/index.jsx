import React from 'react';

import { Link } from 'react-router-dom';

import loukinhoImg from '../../assets/logo/logo3.png';
import textLogoImg from '../../assets/logo/logo4.png';

import './styles.css';

const Header = (props) => {
    return (
        <div className="header-container">
            <div>
                <img src={loukinhoImg} alt="Loukinho" />
                <img src={textLogoImg} alt="Gift Loucos" className="logo_text" />
            </div>
            <nav>
                <ul>
                    <li><Link to={"/"} className={props.selectedOption === 'home' ? "selectedOption" : "customButton"}>Home</Link></li>
                    <li><Link to={"/favoritos"} className={props.selectedOption === 'favorities' ? "selectedOption" : "customButton"}>Favoritos</Link></li>
                    <li><Link to={"/carrinho"} className={props.selectedOption === 'shopping_car' ? "selectedOption" : "customButton"}>Carrinho</Link></li>
                    <li><Link to={"/cadastro"} className={props.selectedOption === 'register' ? "selectedOption" : "customButton"}>Cadastrar</Link></li>
                    <li><Link to={"/sobre"} className={props.selectedOption === 'about' ? "selectedOption" : "customButton"}>Sobre</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Header;