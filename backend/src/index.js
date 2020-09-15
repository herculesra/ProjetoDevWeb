const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

// como está em desenvolvimento deixa apenas assim
app.use(cors());
// informando para nossa API que as requisições serão JSON
app.use(express.json());
// usando as rotas
app.use(routes);

app.listen(3000);