const Card = require('../models/card');
const {
  SUCCESS_CODE_200,
  ERROR_CODE_400, SUCCESS_CREATE_CODE_201,
} = require('../const/errors_code');
// DELETE /cards/:cardId — удаляет карточку по идентификатору
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ });
    res.send(cards);
  } catch (err) {
    res.status(ERROR_CODE_400).send(err);
  }
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.query.cardId,
  { $addToSet: { likes: req.query._id } },
  { new: true },
).then((card) => {
  res.status(SUCCESS_CODE_200).send(card);
}).catch((err) => {
  res.status(ERROR_CODE_400).send(err);
});

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.query.cardId,
  { $pull: { likes: req.query._id } },
  { new: true },
).then((card) => {
  res.status(SUCCESS_CODE_200).send(card);
}).catch((err) => {
  res.status(ERROR_CODE_400).send(err);
});

const createCard = (req, res) => {
  const { name, about, avatar } = req.body;

  Card.create({ name, about, avatar })
    .then((user) => {
      res.status(SUCCESS_CREATE_CODE_201).send({
        _id: user._id,
        name,
        about,
        avatar,
      });
    })
    .catch((err) => {
      res.status(ERROR_CODE_400).send(err);
    });
};

module.exports = {
  likeCard,
  dislikeCard,
  getCards,
  createCard,
};
