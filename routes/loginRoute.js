// loginRoute
const router = require('express').Router();
const passport = require('passport');

const passportConf = require('../config/passport');
const loginControll = require('../controllers/loginControll');

router.post(
  '/',
  passport.authenticate('facebookToken', { session: false }),
  loginControll.face
);

module.exports = router;
