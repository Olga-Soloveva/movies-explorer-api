const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const { notFoundController } = require('../controllers/notFoundController');
const { validateUserBody, validateAuthentication } = require('../middlewares/validation');

router.post('/signin', validateAuthentication, login);
router.post('/signup', validateUserBody, createUser);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', notFoundController);

module.exports = router;
