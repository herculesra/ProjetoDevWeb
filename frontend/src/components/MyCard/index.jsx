import React, { useState, useEffect} from 'react';

import './styles.css';

const MyCard = (props) => {
    const [nome, setNome] = useState('');
    const [preco, setPreco] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [qtdVendido, setQtdVendido] = useState(0);
    const [favorito, setFavorito] = useState(false);
    const [promocao, setPromocao] = useState(false);


    useEffect(()=>{
        if(props){
            setNome(props.nome);
            setPreco(props.preco);
            setCategoria(props.categoria);
            setQtdVendido(props.qtdVendido);
            setFavorito(props.favorito);
            setPromocao(props.promocao);
        }
    });

    return (
        <div className="my-card">
            <h3>{nome}</h3>
            <p>{preco}</p>
            <p>{categoria}</p>
            <p>Vendidos: {qtdVendido}</p>
            <button>Comprar</button>
            {/* adicionar icone Star */}
            <button>Favoritar</button>
        </div>
    );
}

export default MyCard;