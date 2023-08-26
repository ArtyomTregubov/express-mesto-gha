const Card = require('../models/card');
const {
  SUCCESS_CODE_200,
  SUCCESS_CREATE_CODE_201,
  ERROR_NOT_FOUND_CODE_404,
  getStatusError,
} = require('../utils/errors_code');

const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ });
    res.send(cards);
  } catch (err) {
    res.status(getStatusError(err)).send(err);
  }
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((like) => {
    if (like) {
      res.status(SUCCESS_CODE_200).send(like);
      return;
    }
    res.status(ERROR_NOT_FOUND_CODE_404).send({ message: 'Карточки не существует' });
  }).catch((err) => {
    res.status(getStatusError(err)).send(err);
  });
};

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((dislike) => {
  if (dislike) {
    res.status(SUCCESS_CODE_200).send(dislike);
    return;
  }
  res.status(ERROR_NOT_FOUND_CODE_404).send({ message: 'Карточки не существует' });
}).catch((err) => {
  res.status(getStatusError(err)).send(err);
});

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(SUCCESS_CREATE_CODE_201).send({
        _id: card._id,
        name,
        link,
        owner,
      });
    })
    .catch((err) => {
      res.status(getStatusError(err)).send(err);
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.deleteOne({ _id: cardId }, { runValidators: true }).then((card) => {
    if (!card.deletedCount) {
      res.status(ERROR_NOT_FOUND_CODE_404).send({ message: 'Карточки не существует' });
      return;
    }
    res.status(SUCCESS_CODE_200).send(card);
  }).catch((err) => {
    res.status(getStatusError(err)).send(err);
  });
};

module.exports = {
  likeCard,
  dislikeCard,
  getCards,
  createCard,
  deleteCard,
};
