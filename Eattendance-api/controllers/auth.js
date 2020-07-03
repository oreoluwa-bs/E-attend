/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config');


const User = require('../models/user');

const signup = (req, res) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            role: req.body.role,
            idNumber: req.body.idNumber,
            password: hash,
        });
        user.save().then((data) => {
            res.status(200).json({
                status: 'success',
                data,
            });
        }).catch((err) => {
            res.status(400).json({
                status: 'error',
                message: err,
            });
        });
    }).catch((err) => {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    });
};

const login = (req, res) => {
    User.findOne({ email: req.body.email })
        .populate('enrolledCourses')
        .populate('createdCourses')
        .exec()
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    status: 'error',
                    message: 'Incorrect email or password',
                });
            }
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) {
                    return res.status(401).json({
                        status: 'error',
                        message: 'Incorrect email or password',
                    });
                }
                const token = jwt.sign(
                    { userId: user.id },
                    config.decrypt_me,
                    { expiresIn: '24h' },
                );
                // eslint-disable-next-line no-param-reassign
                user.password = null;
                res.status(200).json({
                    status: 'success',
                    userId: user.id,
                    auth: user,
                    token,
                });
            }).catch((err) => {
                res.status(401).json({
                    status: 'success',
                    message: err,
                });
            });
        }).catch((err) => {
            res.status(401).json({
                status: 'success',
                message: err,
            });
        });
};

const getUsers = (req, res) => {
    User.find()
        .populate('enrolledCourses')
        .populate('createdCourses')
        .exec()
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data,
            });
        });
};

const getUser = (req, res) => {
    User.findById(res.locals.userId)
        .populate('enrolledCourses')
        .populate('createdCourses')
        .exec()
        .then((data) => {
            res.status(200).json({
                status: 'success',
                data,
            });
        });
};


module.exports = {
    signup,
    login,
    getUsers,
    getUser
};
