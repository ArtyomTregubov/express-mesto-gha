const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  likeCard, dislikeCard, getCards, createCard, deleteCard,
} = require('../controllers/cards');
const { cardValidator } = require('../utils/cardValidationJoi');

router.get('/', auth, getCards);

router.post('/', cardValidator, auth, createCard);

router.delete('/:cardId', auth, deleteCard);

router.put('/:cardId/likes', auth, likeCard);

router.delete('/:cardId/likes', auth, dislikeCard);

module.exports = router;
