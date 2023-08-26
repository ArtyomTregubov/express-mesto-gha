const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  likeCard, dislikeCard, getCards, createCard, deleteCard,
} = require('../controllers/cards');

router.get('/cards', auth, getCards);

router.post('/cards', auth, createCard);

router.delete('/cards/:cardId', auth, deleteCard);

router.put('/cards/:cardId/likes', auth, likeCard);

router.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = router;
