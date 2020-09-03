const express = require('express');
const routes = require('./routes');

const app = express();

//como só vai trabalhar com json, para saber lidar com requisições no formato de json.
app.use(express.json());
app.use(routes);

app.listen(3333);