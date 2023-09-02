const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  likeCard, dislikeCard, getCards, createCard, deleteCard,
} = require('../controllers/cards');
const { cardValidator, cardIdValidator } = require('../utils/cardValidationJoi');

router.get('/', auth, getCards);

router.post('/', cardValidator, auth, createCard);

router.delete('/:cardId', cardIdValidator, auth, deleteCard);

router.put('/:cardId/likes', cardIdValidator, auth, likeCard);

router.delete('/:cardId/likes', cardIdValidator, auth, dislikeCard);

module.exports = router;
