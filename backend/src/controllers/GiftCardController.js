const connection = require('../database/connection');

// import createCard from './util';

module.exports = {
    // Buscando todos os gifts cards
    async index(request, response) {

        // Caso não exista a informação da pagina, ele busca seta pra 1.
        const { page = 1} = request.query;

        const totalElements = await connection('gift_card').count({count: '*'});

        const data = await connection('gift_card')
            .limit(6)
            .offset((page - 1) * 6)
            .select('*');

        return response.json({ data, total: totalElements[0].count });
    },

    // Criando um gift card
    async create(request, response) {
        console.log(request.body);
        const { name, category, price, favority, promotion, shopping_car, selling_qtt, url_image } = request.body;

        const [codigo] = await connection('gift_card').insert({
            name,
            category,
            price,
            favority,
            promotion,
            shopping_car,
            selling_qtt,
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

            const { name, category, price, favority, promotion, shopping_car, selling_qtt, url_image } = element;

            const [codigo] = await connection('gift_card').insert({
                name,
                category,
                price,
                favority,
                promotion,
                shopping_car,
                selling_qtt,
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
        const { codigo, name, category, price, favority, promotion, shopping_car, selling_qtt, url_image } = request.body;

        try {
            await connection('gift_card').where('codigo', codigo).update({
                "name": name,
                "category": category,
                "price": price,
                "favority": favority,
                "promotion": promotion,
                "shopping_car": shopping_car,
                "selling_qtt": selling_qtt,
                "url_image": url_image
            });

        } catch (e) {
            console.log("erro: ", e);
            return response.status(404).json({ msg: 'error: code not found' });
        }

        return response.status(200).json({ msg: 'sucess: giftcard sucessfully updated' });
    },

    async listCardsByName(request, response){

        const { page = 1} = request.query;

        const name = request.params.name;
        
        try{
            const data = await connection('gift_card')
                .limit(6)
                .offset((page - 1) * 6)
                .where('name', 'like', name+'%');

            return response.status(200).json({ data });
        }catch (e) {
            console.log(e);
            return response.status(404).json({ msg: 'error: name not found' });
        }
    },

    async listCardsByCategory(request, response){

        const { page = 1} = request.query;

        const category = request.params.category;

        try{
            const dados = await connection('gift_card')
                .limit(6)
                .offset((page - 1) * 6)
                .where('category', category);

            return response.status(200).json({ dados });
        }catch(e){
            console.log("Error: ", e);
            return response.status(404).json({ msg: "Error: category not found" });
        }
        
    },

    async listCardsByMoreSell(request, response){
        const { page = 1} = request.query;

        const dados = await connection('gift_card')
            .limit(6)
            .offset((page - 1) * 6)
            .orderBy('selling_qtt', "desc");

        return response.json({ dados });
    },

    async listCardsInShoppingCar(request, response){
        const dados = await connection('gift_card').where("shopping_car", "true");

        return response.status(200).json({ dados });
    }
}