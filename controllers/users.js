const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const data = { ...req.body };

  User.create(data)
    .then(user => res.send(user))
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя!' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка' })
      }
    });
};

module.exports.getUserByID = (req, res) => {

  User.findById(req.params.id, { lean: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден!' })
      } else {
        res.send(user)
      }
    })
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true, lean: true })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден!' })
      } else {
        res.send({ data: user })
      }
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля!' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true, lean: true }).lean()
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: 'Пользователь по указанному _id не найден!' })
      }
      res.send({ data: user })
    })
    .catch(err => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара!' })
      } else {
        res.status(500).send({ message: 'Произошла ошибка' });
      }
    });
};