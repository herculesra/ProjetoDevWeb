import React from 'react';

import './styles.css';

import { cards } from '../util';

import MyCard from '../../components/MyCard';

const Home = (props) => {
    
    return (
        <>
            { cards.map( e => 
                <MyCard
                    nome={e.nome} 
                    preco={e.preco} 
                    categoria={e.categoria}
                    qtd_vendido={e.qtd_vendido}
                    key={"MyCard" + e.codigo}
                ></MyCard>
            )
            }
        </>
    );
}

export default Home;