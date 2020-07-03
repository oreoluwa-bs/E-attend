/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');
const Meetup = require('../models/meetup');

const createMeetup = (req, res) => {
    const tempAttendances = req.body.attendeeNames.split(',');
    const meetup = new Meetup({
        name: req.body.name,
        attendances: []
    });

    tempAttendances.forEach(name => {
        const attendFormat = {
            name,
        }
        meetup.attendances.push(attendFormat);
    });

    meetup.save().then((data) => {
        User.findById(res.locals.userId).then((result) => {
            result.meetups.push(data);
            result.save().then(() => {
                res.status(200).json({
                    status: 'success',
                    data,
                });
            })
        });
    }).catch((err) => {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    });
};

const deleteMeetup = (req, res) => {
    Meetup.findByIdAndDelete(req.params.meetupId).then(() => {
        res.status(200).json({
            status: 'success',
        });
    }).catch(() => {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    })
};

// const getUsers = (req, res) => {
//     User.find({})
//         .populate('meetups')
//         .exec()
//         .then((data) => {
//             res.status(200).json({
//                 status: 'success',
//                 data,
//             });
//         });
//     // User.find().then((data) => {
//     //     res.status(200).json({
//     //         status: 'success',
//     //         data,
//     //     });
//     // }).catch((err) => {
//     //     res.status(400).json({
//     //         status: 'error',
//     //         message: err,
//     //     });
//     // });
// };

const handleSaveAttendance = (req, res) => {
    const newAttend = req.body.attendances
    newAttend.forEach(element => {
        element.date = req.body.date
    });
    Meetup.findById(req.params.meetupId).then((meetup) => {
        const attendances = meetup.attendances;

        for (let i = 0; i < attendances.length; i++) {
            attendances[i].attendance.push(newAttend[i]);
        }

        meetup.attendances = attendances;
        meetup.save().then(() => {
            res.status(200).json({
                status: 'success',
            });
        }).catch((err) => {
            res.status(400).json({
                status: 'error',
                err
            });
        });
    }).catch((err) => {
        res.status(400).json({
            status: 'error',
            err
        });
    });
};

module.exports = {
    createMeetup,
    deleteMeetup,
    // getUsers,
    handleSaveAttendance
};
