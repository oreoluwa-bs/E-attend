const express = require('express');

const auth = require('../middleware/auth');

const db = require('../controllers/course');

const router = express.Router();


router.get('/', db.getCourses);

router.post('/create-course', auth, db.createCourse);

router.delete('/:courseId', auth, db.deleteCourse);

router.post('/enroll/:courseId', auth, db.enrollCourse);

router.post('/:courseId/new-attendance', auth, db.handleSaveAttendance);

router.put('/:courseId/edit-attendance', auth, db.EditUserAttendance);

// router.post('/login', db.login);

module.exports = router;
