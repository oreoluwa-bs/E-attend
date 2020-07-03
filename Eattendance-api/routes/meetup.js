const express = require('express');

const auth = require('../middleware/auth');

const db = require('../controllers/meetup');

const router = express.Router();


// router.get('/', db.getUsers);

router.post('/create-meetup', auth, db.createMeetup);

router.delete('/delete/:meetupId', auth, db.deleteMeetup);

router.post('/:meetupId/new-attendance', auth, db.handleSaveAttendance);

// router.post('/login', db.login);

module.exports = router;
