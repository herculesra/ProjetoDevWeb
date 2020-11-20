import React, { useEffect, useState } from 'react';

import { Pagination } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
//componentes

//model
import CardModel from '../../model/card-model';

//api
import api from '../../services/api';

//css
import './styles.css';

const ComponentTest = () => {

    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(1);


    useEffect(() => {
        //limit to obtain the pages.
        const limit = 6;

        const fetchDataApi = async () => {
            setLoading(true);
            
            const query = `/giftcard?page=${activePage}`
            const res = await api.get(query, {});

            setCards(res.data.data.map(e => new CardModel(e.code, e.name, e.category, e.price, e.favority, e.promotion, e.shopping_car, e.selling_qtt, e.url_image)));
            setTotalPages(Math.ceil(res.data.total / limit));
            setLoading(false);
        }

        fetchDataApi();
    }, [activePage]);

    return (
        <React.Fragment>
            <h1>Componente de Teste</h1>
            {loading ?
                null :
                cards.map((e, i) => (
                    <div key={"elemento" + i}>{i}: {e.name}</div>
                ))
            }

            <Pagination
                prev={true}
                next={true}
                first={true}
                last={true}
                ellipsis={true}
                boundaryLinks={true}
                size={'lg'}
                pages={totalPages}
                maxButtons={2}
                activePage={activePage}
                onSelect={(page)=>setActivePage(page)}
            />
        </React.Fragment>
    );
}

export default ComponentTest;