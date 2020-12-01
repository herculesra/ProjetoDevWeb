import React from 'react';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './styles.css';

const Sobre = () => {

    return (
        <React.Fragment>
            <Header selectedOption={"about"}></Header>
            <h1></h1>
            <Footer></Footer>
        </React.Fragment>
    );
}

export default Sobre;