import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';

export default function Routes(){
    return(
        <BrowserRouter>
        {/* o switch garante que apenas uma rota seja executada no momento */}
            <Switch>
                {/* exact evita que o '/' nao seja chamado quando acessado outra rota com '/' */}
                <Route path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    )
}