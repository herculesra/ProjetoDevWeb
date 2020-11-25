import React, { useState, useEffect } from 'react';

//model
import CardModel from '../../model/card-model';

//api
import api from '../../services/api';

//css
import './styles.css';

//util 
import dataSearch from './util.js';

const SearchCards = (props) => {
    const [valueSelected, setValueSelected] = useState('all');
    const [auxTimeout, setAuxTimeout] = useState(undefined);
    const activePage = props.page
    const LIMIT = props.limit

    const handleChangeName = (event) =>{
        if (auxTimeout) {
            clearTimeout(auxTimeout)
        }
        
        const name = event.target.value;

        if(name === ''){return}

        setAuxTimeout(setTimeout(() => {
            fetchDataApiWithOptions(name, true);
        }, 1000))
    }

    const handleSelectCategory = (event) => {

        const name = event.target.value;

        // if(name === 'all'){
        //     props.handleCards()
        // }

        fetchDataApiWithOptions(name, false);
    }

    const fetchDataApiWithOptions = async (name, option) => {
        
        let query = `/giftcard/category/${name}?page=${activePage}&limit=${LIMIT}`

        if(option){
            query = `/giftcard/name/${name}?page=${activePage}&limit=${LIMIT}`;
        }

        try{
            const res = await api.get(query, {});
            const cards = res.data.data.map(e => new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt, e.url_image));
            const totalPages = Math.ceil(res.data.total / LIMIT)
            props.handleCards(cards, totalPages)
        }catch(e){
            console.erro(e);
        }
    }

    return (
        <React.Fragment>
            <div className="input-data">
                <input
                    type="text"
                    className="search-by-name"
                    placeholder="Digite o nome do GiftCard"
                    onChange={handleChangeName}
                />
                <select
                    value={valueSelected}
                    onChange={handleSelectCategory}
                >
                    {dataSearch.map((e, index) => <option key={"option" + index} value={e.value} >{e.label}</option>)}
                </select>
            </div>
        </React.Fragment>
    )
}

export default SearchCards;