import React from 'react';

import './styles.css';

import { cards } from '../util';

import Card from '../../components/Card'

const Home = (props) => {
    
    return (
        <>
            <div>
                {cards ? cards.map((entry, index) => {
                    <Card 
                        nome={entry.nome} 
                        preco={entry.preco} 
                        categoria={entry.categoria}
                        qtd_vendido={entry.qtd_vendido}
                    />
                }) : null}
            </div>

            <h1>PORRA</h1>
        </>
    );
}

export default Home;