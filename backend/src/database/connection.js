const knex = require('knex');
const configuration = require('../../knexfile');
// coneccao de desenvolvimento
const connection = knex(configuration.development);

// exportando a conexão com o banco de dados
module.exports = connection;