import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home/index.jsx';
import Favoritos from './pages/Favoritos';
import Carrinho from './pages/Carrinho';
import Cadastro from './pages/Cadastro';
import Sobre from './pages/Sobre';


export default function Routes(){
    return(
        <BrowserRouter>
        {/* o switch garante que apenas uma rota seja executada no momento */}
            <Switch>
                {/* exact evita que o '/' nao seja chamado quando acessado outra rota com '/' */}
                <Route path="/" exact component={Home} />
                <Route path="/favoritos" exact component={Favoritos} />
                <Route path="/carrinho" exact component={Carrinho} />
                <Route path="/cadastro" exact component={Cadastro} />
                <Route path="/sobre" exact component={Sobre} />

            </Switch>
        </BrowserRouter>
    )
}