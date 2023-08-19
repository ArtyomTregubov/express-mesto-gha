const router = require('express').Router();
const { likeCard, dislikeCard } = require('../controllers/cards');

router.put('/cards/:cardId/likes', likeCard);

router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
