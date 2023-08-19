const router = require('express').Router();
const { likeCard, dislikeCard, getCards, createCard } = require('../controllers/cards');

// POST /cards — создаёт карточку
// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.get('/cards', getCards);
router.post('/cards', createCard);

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
