import React, {useState} from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

// CSS
import './styles.css';

// Logo
import logoImg from '../../assets/logo/logo1.png';

// Api
import api from '../../services/api';

const Cadastro = () => {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("games");
    const [price, setPrice] = useState(0);
    const [favority, setFavority] = useState(false);
    const [promotion, setPromotion] = useState(false);
    const [shopping_car, setShopping_car] = useState(false);
    const [selling_qtt, setSelling_qtt] = useState(0);
    const [url_image, setUrl_image] = useState("");

    const handleNewCard = async (event) => {
        event.preventDefault();

        const data = {
            name,
            category,
            price,
            favority,
            promotion,
            shopping_car,
            selling_qtt,
            url_image,
        };

        try {
            await api.post('giftcard', data, {});
        } catch (error) {
            console.error(error);
            alert("Erro, não foi possível cadastrar um novo caso.")
        }
    }

    return (
        <React.Fragment>
            <Header></Header>
            <div className="main-register">
                <div className="content">

                    <section>
                        <div></div>
                        <h1>Cadastrar novo cartão</h1>
                        <p><strong>OBS:</strong> A imagem do cartão pode ser uma URL, nome dos arquivos previamente já cadastrados ou nenhum caracter.</p>

                        <Link className="back-link" to="/">
                            <FiArrowLeft size={16} color="#8410b3"/>
                            Voltar para Home
                        </Link>
                    </section>

                    <form onSubmit={handleNewCard}>
                        <input
                            className="register-name-card"
                            placeholder="Nome do cartão"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />

                        <div className="register-category-card">
                            <label >Categoria: </label>
                            <select 
                                value={category}
                                onChange={ e => setCategory(e.target.value)}
                            >
                                <option value="games" selected>Jogos</option>
                                <option value="store">Loja</option>
                                <option value="streaming">Streaming</option>
                            </select>
                        </div>
                        <div className="register-promotion-card">
                            <label >Promoção:</label>
                            <select
                                value={promotion}
                                onChange={ e => setPromotion(e.target.value)}
                            >
                                <option value={false} selected>Não</option>
                                <option value={true}>Sim</option>
                            </select>
                        </div>
                        <div className="register-price-card">
                            <label >Preço: </label>
                            <input
                                type="number"
                                placeholder="Valor"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        
                        <input
                            className="register-image-card"
                            placeholder="Nome ou URL da imagem"
                            value={name}
                            onChange={e => setUrl_image(e.target.value)}
                        />
                        <div className="register-card-button">
                            <button className="button register-button-card" type="submit">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </React.Fragment>
    );
}

export default Cadastro;

