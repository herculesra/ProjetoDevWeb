import React, { useState } from 'react';

import './styles.css';

const MyCard = ({ cardModel }) => {

    console.log(cardModel);

    const [nome, setNome] = useState(cardModel.nome);
    const [preco, setPreco] = useState(cardModel.preco);
    const [categoria, setCategoria] = useState(cardModel.categoria);
    const [qtdVendido, setQtdVendido] = useState(cardModel.qtd_vendido);
    const [urlImage, setUrlImage] = useState(cardModel.url_image);
    const [favorito, setFavorito] = useState(false);
    const [promocao, setPromocao] = useState(false);

    return (
        <div className="my-card">
            <h3>{nome}</h3>
            <p>{preco}</p>
            <p>{categoria}</p>
            <p>Vendidos: {qtdVendido}</p>
            <button className="button">Comprar</button>
            {/* adicionar icone Star */}
            <button className="button">Favoritar</button>
        </div>
    );
}

export default MyCard;