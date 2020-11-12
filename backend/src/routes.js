const express = require('express');

const GiftCardController = require('./controllers/GiftCardController');

const routes = express.Router();

routes.get('/giftcard', GiftCardController.index);
routes.post('/giftcard', GiftCardController.create);
routes.delete('/giftcard/:code', GiftCardController.delete);
// routes.put('/giftcard', GiftCardController.update);


module.exports = routes;