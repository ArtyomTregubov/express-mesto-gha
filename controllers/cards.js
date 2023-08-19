const Card = require('../models/card');
const {
  SUCCESS_CODE_200,
  ERROR_CODE_400,
} = require('../const/errors_code');

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

module.exports = {
  likeCard,
  dislikeCard,
};
