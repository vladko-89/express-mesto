const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then(card => res.send(card))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании карточки!' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка' })
      }
    })
};

module.exports.deleteCardByID = (req, res) => {

  Card.findByIdAndRemove(req.params.id)
    .then(card => {
      if (!card) {
        res.status(404).send({ message: 'Карточка с указанным _id не найдена!' })
      } else {
        res.send(card)
      }
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).then(card => {
    if (!card) {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена!' })
    } else {
      res.send(card)
    }
  })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при постановке лайка!' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка' })
      }
    })
}


module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).then(card => {
    if (!card) {
      res.status(404).send({ message: 'Карточка с указанным _id не найдена!' })
    } else {
      res.send(card)
    }
  })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при снятии лайка!' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка' })
      }
    })
}