const { Router } = require('express');

const router = require('express').Router();
const checkToken = require('../utils/checkToken');

router.use('/users', checkToken,require('./api/users'));
router.use('/login', require('./api/login'));

router.use('/warehouses', require('./api/warehouses'));
router.use('/companies', require('./api/companies'));

module.exports = router;