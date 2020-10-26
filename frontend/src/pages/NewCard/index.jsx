import React from 'react';

// Hook personalizado
import { useCount } from '../../context/Count';

import './styles.css';

const NewCard = () => {
    const [count, setCount] = useCount();

    const changeCount = () => {
        setCount(count + 1);
    }

    return (
        <div>
            <h1>Cadastrar Novo Card</h1>
            <button onClick={changeCount}>Adicionar</button>
        </div>

    );
}

export default NewCard;