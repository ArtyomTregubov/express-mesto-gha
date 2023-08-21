const router = require('express').Router();
const {
  likeCard, dislikeCard, getCards, createCard, deleteCard,
} = require('../controllers/cards');

// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.get('/cards', getCards);
router.post('/cards', createCard);
router.delete('/cards/:cardId', deleteCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
