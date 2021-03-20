const userRouter = require('./users');
const cardsRouter = require('./cards')

const router = require('express').Router();

router.use('/users', userRouter);
router.use('/cards', cardsRouter);

router.use((req, res) => {
  res.status(404).send({ message: `Ресурс по адресу ${req.path} не найден` });
});

module.exports = router;