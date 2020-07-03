const express = require('express');

const auth = require('../middleware/auth');

const db = require('../controllers/auth');

const router = express.Router();


router.get('/', db.getUsers);

router.get('/user', auth, db.getUser);

router.post('/create-user', db.signup);

router.post('/login', db.login);

module.exports = router;
