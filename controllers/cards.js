const Card = require('../models/card');
const NotFoundError404 = require('../errors/notFoundError404');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({ });
    if (!cards) { next(new NotFoundError404('Пользователь не найден')); return; }
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((like) => {
    if (!like) { next(new NotFoundError404('Карточки не существует')); return; }
    res.send(like);
  }).catch(next);
};

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((dislike) => {
  if (!dislike) { next(new NotFoundError404('Карточки не существует')); return; }
  res.send(dislike);
}).catch(next);

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId }, { runValidators: true }).then((card) => {
    if (!card.deletedCount) { next(new NotFoundError404('Карточки не существует')); return; }
    res.send(card);
  }).catch(next);
};

module.exports = {
  likeCard,
  dislikeCard,
  getCards,
  createCard,
  deleteCard,
};
