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
  if(like) {
    res.status(SUCCESS_CODE_200).send(like);
    return;
  }
    res.status(ERROR_NOT_FOUND_CODE_404).send({message: "Карточки не существует"});
}).catch((err) => {
  res.status(ERROR_CODE_400).send(err);
});
};

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
).then((dislike) => {

    if(dislike) {
    res.status(SUCCESS_CODE_200).send(dislike);
    return;
  }
    res.status(ERROR_NOT_FOUND_CODE_404).send({message: "Карточки не существует"});
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

const deleteCard = (req, res) => {
  const {cardId} = req.params;
  Card.deleteOne(
  {_id:cardId}, {runValidators: true }
).then((card) => {
  if(!card.deletedCount){
    res.status(ERROR_NOT_FOUND_CODE_404).send({message: "Карточки не существует"});
    return
  }
  res.status(SUCCESS_CODE_200).send(card);
}).catch((err) => {
  if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_400).send(err);
        return;
      }
  else if(err.name === 'CastError') {
        res.status(ERROR_CODE_400).send(err);
        return;
      }
    res.status(ERROR_NOT_FOUND_CODE_404).send(err);
});
}


module.exports = {
  likeCard,
  dislikeCard,
  getCards,
  createCard,
  deleteCard
};
