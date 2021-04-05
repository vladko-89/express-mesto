const jwt = require('jsonwebtoken');
const UnAuthError = require('../errors/un-auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw UnAuthError('Необходима авторизация');
    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, 'eb28135ebcfc17578f96d4d65b6c7871f2c803be4180c165061d5c2db621c51b');
    req.user = payload;

    next();
  } catch (err) {
    next(new UnAuthError('Необходима авторизация'));
  }
};
