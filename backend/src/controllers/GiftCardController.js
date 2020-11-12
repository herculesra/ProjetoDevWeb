const { update } = require('../database/connection');
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
        const { nome, categoria, preco, favorito, promocao, qtd_vendido, url_image } = request.body;
        
        const [ codigo ] = await connection('gift_card').insert({
            nome,
            categoria,
            preco,
            favorito, 
            promocao, 
            qtd_vendido,
            url_image,
        });

        return response.json({ codigo });
    },

    async delete(request, response){

        const code = request.params.code;

        try{
            await connection('gift_card').where('codigo', code).del();
        }catch(e){ 
            console.log("erro: ", e);
            return response.status(404).json({error: 'code not found'});
        }

        return response.status(200).json({sucess: 'giftcard successfully deleted'});
    }

    // async update(request, response){

    // }
}