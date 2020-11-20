import React, { useEffect, useState } from 'react';

import { Pagination, SelectPicker } from 'rsuite';
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

const ComponentTest = () => {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);
    const [valueSearch, setValueSearch] = useState('Todos');


    //limit to obtain the pages.
    const LIMIT = 6;

    useEffect(() => {

        const fetchDataApi = async () => {
            setLoading(true);

            const query = `/giftcard?page=${activePage}&limit=${LIMIT}`
            const res = await api.get(query, {});

            setCards(res.data.data.map(e => new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt, e.url_image)));
            setTotalPages(Math.ceil(res.data.total / LIMIT));
            setLoading(false);
        }

        fetchDataApi();
    }, [activePage]);

    return (
        <React.Fragment>
            <h1>Componente de Teste</h1>
            <SelectPicker
                value={valueSearch}
                onChange={value => setValueSearch(value)}
                data={dataSearch}
                style={{ width: 1030 }}
            />
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
                onSelect={(page) => setActivePage(page)}
            />
        </React.Fragment>
    );
}

export default ComponentTest;