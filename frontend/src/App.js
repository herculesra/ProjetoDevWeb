import React from 'react';

import './global.css';

// Context
import CountProvider from './context/Count';

// Rotas
import Routes from './routes';


function App() {

  return (
    <CountProvider>
      <Routes />
    </CountProvider>
  );
}

export default App;