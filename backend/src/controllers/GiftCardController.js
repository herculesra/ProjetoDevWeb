const connection = require('../database/connection');

// import createCard from './util';

module.exports = {
    // Buscando todos os gifts cards
    async index(request, response) {
        const dados = await connection('gift_card').select('*');

        return response.json({ dados });
    },

    // Criando um gift card
    async create(request, response) {
        console.log(request.body);
        const { nome, categoria, preco, favorito, promocao, qtd_vendido, url_image } = request.body;

        const [codigo] = await connection('gift_card').insert({
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

    async createManyCards(request, response) {
        const data = request.body;

        let arrrayOfCodes = [];

        // Como o retorno do "Data.map" não é uma promise, o await não espera, logo o array não é preenchido
        // Colocando Promise.all transforma a função em uma promise, logo o await funciona.
        await Promise.all(data.map(async element => {

            const { nome, categoria, preco, favorito, promocao, qtd_vendido, url_image } = element;

            const [codigo] = await connection('gift_card').insert({
                nome,
                categoria,
                preco,
                favorito,
                promocao,
                qtd_vendido,
                url_image,
            });

            arrrayOfCodes.push(codigo);
        }));

        return response.status(200).json({ codigos: arrrayOfCodes });
    },

    async delete(request, response) {

        const code = request.params.code;

        try {
            await connection('gift_card').where('codigo', code).del();
        } catch (e) {
            console.log("erro: ", e);
            return response.status(404).json({ msg: 'error: code not found' });
        }

        return response.status(200).json({ msg: 'sucess: giftcard successfully deleted' });
    },

    async updateCard(request, response) {
        const { codigo, nome, categoria, preco, favorito, promocao, qtd_vendido, url_image } = request.body;

        try {
            await connection('gift_card').where('codigo', codigo).update({
                nome: nome,
                "categoria": categoria,
                "preco": preco,
                "favorito": favorito,
                "promocao": promocao,
                "qtd_vendido": qtd_vendido,
                "url_image": url_image
            });

        } catch (e) {
            console.log("erro: ", e);
            return response.status(404).json({ msg: 'error: code not found' });
        }

        return response.status(200).json({ msg: 'sucess: giftcard sucessfully updated' });
    },

    async listCardsByName(request, response){
        const name = request.params.name;
        
        try{
            const data = await connection('gift_card').where('nome', 'like', name+'%');
            return response.status(200).json({ data });
        }catch (e) {
            console.log(e);
            return response.status(404).json({ msg: 'error: name not found' });
        }
    },

    async listCardsByCategory(request, response){
        const category = request.params.category;

        try{
            const dados = await connection('gift_card').where('categoria', category);

            return response.status(200).json({ dados });
        }catch(e){
            console.log("Error: ", e);
            return response.status(404).json({ msg: "Error: category not found" });
        }
        
    },

    async listCardsByMoreSell(request, response){
        const dados = await connection('gift_card').orderBy('qtd_vendido', "desc");

        return response.json({ dados });
    }
}