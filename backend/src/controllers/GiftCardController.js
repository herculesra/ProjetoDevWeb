const { limit } = require('../database/connection');
const connection = require('../database/connection');

// import createCard from './util';

module.exports = {
    // Buscando todos os gifts cards
    async index(request, response) {

        // Caso não exista a informação da pagina, ele busca seta pra 1.
        const { page = 1, limit = 6} = request.query;

        const totalElements = await connection('gift_card').count({count: '*'});

        const data = await connection('gift_card')
            .limit(limit)
            .offset((page - 1) * limit)
            .select('*');

        return response.json({ data, total: totalElements[0].count });
    },

    // Criando um gift card
    async create(request, response) {
        console.log(request.body);
        const { name, category, price, favority, promotion, shopping_car, selling_qtt, url_image } = request.body;

        const [code] = await connection('gift_card').insert({
            name,
            category,
            price,
            favority,
            promotion,
            shopping_car,
            selling_qtt,
            url_image,
        });

        return response.json({ code });
    },

    async createManyCards(request, response) {
        const data = request.body;

        let arrrayOfCodes = [];

        // Como o retorno do "Data.map" não é uma promise, o await não espera, logo o array não é preenchido
        // Colocando Promise.all transforma a função em uma promise, logo o await funciona.
        await Promise.all(data.map(async element => {

            const { name, category, price, favority, promotion, shopping_car, selling_qtt, url_image } = element;

            const [code] = await connection('gift_card').insert({
                name,
                category,
                price,
                favority,
                promotion,
                shopping_car,
                selling_qtt,
                url_image,
            });

            arrrayOfCodes.push(code);
        }));

        return response.status(200).json({ codes: arrrayOfCodes });
    },

    async delete(request, response) {

        const code = request.params.code;

        try {
            await connection('gift_card').where('code', code).del();
        } catch (e) {
            console.log("erro: ", e);
            return response.status(404).json({ msg: 'error: code not found' });
        }

        return response.status(200).json({ msg: 'sucess: giftcard successfully deleted' });
    },

    async updateCard(request, response) {

        const { code, name, category, price, favority, promotion, shopping_car, selling_qtt, url_image } = request.body;

        try {
            await connection('gift_card').where('code', code).update({
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

        return response.status(200).json({ msg: 'giftcard sucessfully updated' });
    },

    async listCardsByName(request, response){

        const { page = 1, limit = 6} = request.query;

        const name = request.params.name;
        
        try{

            const totalElements = await connection('gift_card').where('name', 'like', '%'+name+'%').count({count: '*'});

            const data = await connection('gift_card')
                .limit(limit)
                .offset((page - 1) * limit)
                .where('name', 'like', '%'+name+'%');

            return response.status(200).json({ data, total: totalElements[0].count });
        }catch (e) {
            console.log(e);
            return response.status(404).json({ msg: 'error: name not found' });
        }
    },

    async listCardsByCategory(request, response){

        const { page = 1, limit = 6} = request.query;

        const category = request.params.category;

        try{

            const totalElements = await connection('gift_card').where('category', category).count({count: '*'});

            const data = await connection('gift_card')
                .limit(limit)
                .offset((page - 1) * limit)
                .where('category', category);

            return response.status(200).json({ data, total: totalElements[0].count });
        }catch(e){
            console.log("Error: ", e);
            return response.status(404).json({ msg: "Error: category not found" });
        }
        
    },

    async listCardsByMoreSell(request, response){
        const data = await connection('gift_card').orderBy('selling_qtt', "desc");

        return response.json({ data });
    },

    async listCardsInShoppingCar(request, response){
        const data = await connection('gift_card').where("shopping_car", true);

        return response.status(200).json({ data });
    },

    async listFavoritesCards(request, response){
        const data = await connection('gift_card').where('favority', true);

        return response.status(200).json({ data });
    }
}