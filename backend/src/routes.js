const express = require('express');

const GiftCardController = require('./controllers/GiftCardController');

const routes = express.Router();

routes.get('/giftcard', GiftCardController.index);
routes.get('/giftcard/name/:name', GiftCardController.listCardsByName);
routes.get('/giftcard/category/:category', GiftCardController.listCardsByCategory);
routes.get('/giftcard/moresell', GiftCardController.listCardsByMoreSell);

routes.post('/giftcard', GiftCardController.create);
routes.post('/giftcard/manycards', GiftCardController.createManyCards);

routes.delete('/giftcard/:code', GiftCardController.delete);

routes.put('/giftcard', GiftCardController.updateCard);


module.exports = routes;