import React from 'react';

import './styles.css';

const Card = (props) => {
    return (
        <div className="my-card">
            <h3>{props.nome}</h3>
            <p>{props.preco}</p>
            <p>{props.categoria}</p>
            <p>Vendidos: {props.qtd_vendido}</p>
            <button>Comprar</button>
            {/* adicionar icone Star */}
            <button>Favoritar</button>
        </div>
    );
}

export default Card;