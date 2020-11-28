import React from 'react';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';
import { useState } from 'react';

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
                <form onSubmit={handleNewCard}>
                    <input
                        placeholder="Nome do cartão"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <label>Categoria: </label>
                    <select 
                        value={category}
                        onChange={ e => setCategory(e.target.value)}
                    >
                        <option value="games" selected>Jogos</option>
                        <option value="store">Loja</option>
                        <option value="streaming">Streaming</option>
                    </select>
                    <label>Preço: </label>
                    <input
                        type="number"
                        placeholder="Valor"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                    <label>Promoção:</label>
                    <select
                        value={promotion}
                        onChange={ e => setPromotion(e.target.value)}
                    >
                        <option value={false} selected>Não</option>
                        <option value={true}>Sim</option>
                    </select>
                    <input
                        placeholder="Nome ou URL da imagem"
                        value={name}
                        onChange={e => setUrl_image(e.target.value)}
                    />
                    <button className="button" type="submit">Cadastrar</button>
                </form>

            </div>
            <Footer></Footer>
        </React.Fragment>
    );
}

export default Cadastro;

