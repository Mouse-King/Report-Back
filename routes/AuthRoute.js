var express = require('express');
var router = express.Router();
const AuthCtrl = require('../controllers/AuthCtrl')

router.post('/register', AuthCtrl.register);
router.post('/login', AuthCtrl.login);
router.get('/me', AuthCtrl.me);

module.exports = router;
