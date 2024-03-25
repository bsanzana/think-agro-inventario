const { Router } = require('express');

const router = require('express').Router();


router.use('/users', require('./api/users'));
router.use('/login', require('./api/login'));

router.use('/warehouse', require('./api/warehouse'));
router.use('/company', require('./api/company'));

module.exports = router;