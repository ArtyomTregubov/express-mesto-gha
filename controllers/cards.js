const Card = require('../models/card');

const {
  SUCCESS_CODE_200,
  ERROR_CODE_400, SUCCESS_CREATE_CODE_201, ERROR_NOT_FOUND_CODE_404,
} = require('../const/errors_code');
const User = require("../models/user");
// DELETE /cards/:cardId — удаляет карточку по идентификатору
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ });
    res.send(cards);
  } catch (err) {
    res.status(ERROR_CODE_400).send(err);
  }
};

// const likeCard = (req, res) => Card.findByIdAndUpdate(
//   req.query.cardId,
//   { $addToSet: { likes: req.query._id } },
//   { new: true },
// ).then((like) => {
//   res.status(SUCCESS_CODE_200).send({});
// }).catch((err) => {
//   res.status(ERROR_CODE_400).send(err);
// });

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
).then((like) => {
  res.status(SUCCESS_CODE_200).send(like);
}).catch((err) => {
  res.status(ERROR_CODE_400).send(err);
});

  // User.findByIdAndUpdate(id, params, { new: true, runValidators: true })
  //   .then((user) => {
  //     res.send(user);
  //   })
  //   .catch((err) => {
  //     if (err.name === 'ValidationError') {
  //       res.status(ERROR_CODE_400).send(err);
  //       return;
  //     }
  //   res.status(ERROR_NOT_FOUND_CODE_404).send(err);
  //   });
};

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
  const { name, link } = req.body;
  const owner = req.user._id
  Card.create({  name, link, owner })
    .then((card) => {
      res.status(SUCCESS_CREATE_CODE_201).send({
        _id: card._id,
        name,
        link,
        owner
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send(err);
        return;
      }
    res.status(ERROR_NOT_FOUND_CODE_404).send(err);
    });
};

const deleteCard = (req, res) => Card.findByIdAndUpdate(
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
  getCards,
  createCard,
  deleteCard
};
