import React, { useEffect, useState } from 'react';

import { Pagination } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

//componentes
import MyCard from '../MyCard';

//model
import CardModel from '../../model/card-model';

//api
import api from '../../services/api';

//css
import './styles.css';

//util 
import dataSearch from './util.js';

const MainHome = () => {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);

    const [valueSelected, setValueSelected] = useState('all');
    const [auxTimeout, setAuxTimeout] = useState(undefined);

    const [nameAux, setNameAux] = useState('all');
    const [optionAux, setOptionAux] = useState(false);

    //limit to obtain the pages.
    const LIMIT = 6;

    const handleChangePage = (page) => {
        setActivePage(page);
        fetchDataApiWithOptions(nameAux, optionAux, page);
    }

    const handleChangeName = (event) =>{
        if (auxTimeout) {
            clearTimeout(auxTimeout)
        }
        
        const name = event.target.value;

        if(name === ''){
            setNameAux('all');
            setOptionAux(false);
            fetchDataApiWithOptions('all', false, activePage);
            return;
        }

        setAuxTimeout(setTimeout(() => {
            setNameAux(name);
            setOptionAux(true);
            fetchDataApiWithOptions(name, true, activePage);
        }, 1000))
    }

    const handleSelectCategory = (event) => {
        const name = event.target.value;

        setValueSelected(name);

        setNameAux(name);
        setOptionAux(false);
        fetchDataApiWithOptions(name, false, activePage);
    }

    const fetchDataApiWithOptions = async (name, option, page) => {
        let query = `/giftcard/category/${name}?page=${page}&limit=${LIMIT}` // Get Cards By Category

        if(option){
            query = `/giftcard/name/${name}?page=${page}&limit=${LIMIT}`; // Get Cards By Name
        }else if(name === 'all'){
            query = `/giftcard?page=${page}&limit=${LIMIT}` // Get All cards
        }
        
        try{
            const res = await api.get(query, {});
            setCards(res.data.data.map(e => new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt, e.url_image)));
            setTotalPages(Math.ceil(res.data.total / LIMIT));
        }catch(e){
            console.erro(e);
        }
    }

    useEffect(() => {
        const fetchDataApi = async () => {
            setLoading(true);

            const query = `/giftcard`
            const res = await api.get(query, {});

            setCards(res.data.data.map(e => new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt, e.url_image)));
            setTotalPages(Math.ceil(res.data.total / LIMIT));
            setLoading(false);
        }

        fetchDataApi();
    }, []);

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
            <main className="main-container">
                {loading ?
                    null :
                    cards.map(cardModel => (
                        <MyCard key={"MyCard" + cardModel.code} cardModel={cardModel}></MyCard>
                    ))
                }
            </main>
            <Pagination
                className="main-pagination"
                prev={true}
                next={true}
                first={true}
                last={true}
                ellipsis={true}
                boundaryLinks={true}
                size={'lg'}
                pages={totalPages}
                maxButtons={5}
                activePage={activePage}
                onSelect={handleChangePage}
            />
        </React.Fragment>
    );
}

export default MainHome;