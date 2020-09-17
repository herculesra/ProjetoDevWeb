const connection = require('../database/connection');

module.exports = {
    // Buscando todos os gifts cards
    async index(request, response){
        const dados = await connection('gift_card').select('*');

        return response.json({ dados });
    },

    // Criando um gift card
    async create(request, response){
        console.log(request.body);
        const { nome, categoria, preco, favorito, promocao, qtd_vendido } = request.body;
        
        const [ codigo ] = await connection('gift_card').insert({
            nome,
            categoria,
            preco,
            favorito, 
            promocao, 
            qtd_vendido,
        });

        return response.json({ codigo });
    }
}