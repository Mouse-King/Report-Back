const express = require('express');
const router = express.Router();
const AuthRoute = require('./AuthRoute');
const AdminRoute = require('./AdminRoute');

router.use('/auth', AuthRoute);
router.use('/admin', AdminRoute);

module.exports = router;
