/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');
const Course = require('../models/course');

const createCourse = (req, res) => {
    const course = new Course({
        title: req.body.title,
    });

    course.save().then((data) => {
        User.findById(res.locals.userId).then((result) => {
            result.createdCourses.push(data);
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

const deleteCourse = (req, res) => {
    Course.findByIdAndDelete(req.params.courseId).then(() => {
        User.findById(res.locals.userId).then((result) => {
            tempResultCourses = result.createdCourses.filter((cou) => {
                const id = cou._id.toString()
                console.log(id)
                return id !== req.params.courseId;
            });

            result.createdCourses = tempResultCourses;

            result.save().then(() => {
                res.status(200).json({
                    status: 'success',
                });
            })
        });
    }).catch(() => {
        res.status(400).json({
            status: 'error',
            message: err,
        });
    })
};


const getCourses = (req, res) => {
    Course.find().then((data) => {
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
};

// const enrollCourse = (req, res) => {
//     User.findById(res.locals.userId).then((user) => {
//         user.enrolledCourses.push(req.params.courseId);
//         const attendFormat = {
//             name: user.firstname + ' ' + user.lastname,
//             idNumber: user.idNumber
//         }
//         user.save().then(() => {
//             Course.findById(req.params.courseId).then((course) => {
//                 course.attendances.push(attendFormat)

//                 if (course.attendances && course.attendances.length > 0) {
//                     if (course.attendances[0].attendance && course.attendances[0].attendance.length > 0) {
//                         course.attendances[0].attendance.forEach(element => {
//                             const formatt = {
//                                 status: 'absent',
//                                 value: 0,
//                                 date: element.date
//                             }
//                             course.attendances[course.attendances.length - 1].attendance.push(formatt);
//                         });

//                         course.save().then(() => {
//                             res.status(200).json({
//                                 status: 'success',
//                             });
//                         }).catch((err) => {
//                             res.status(404).json({
//                                 status: 'error',
//                                 message: err,
//                             });
//                         });
//                     }
//                 } else {
//                     course.save().then(() => {
//                         res.status(200).json({
//                             status: 'success',
//                         });
//                     }).catch((err) => {
//                         res.status(404).json({
//                             status: 'error',
//                             message: err,
//                         });
//                     });
//                 }
//             }).catch((err) => {
//                 res.status(404).json({
//                     status: 'error',
//                     message: err,
//                 });
//             });
//         }).catch((err) => {
//             res.status(404).json({
//                 status: 'error',
//                 message: err,
//             });
//         });
//     }).catch((err) => {
//         res.status(401).json({
//             status: 'error',
//             message: err,
//         });
//     });
// };

const enrollCourse = (req, res) => {
    User.findById(res.locals.userId).then((user) => {
        user.enrolledCourses.push(req.params.courseId);
        const attendFormat = {
            name: user.firstname + ' ' + user.lastname,
            idNumber: user.idNumber
        }

        Course.findById(req.params.courseId).then((course) => {
            course.attendances.push(attendFormat);
            if (course.attendances && course.attendances.length > 0) {
                if (course.attendances[0].attendance && course.attendances[0].attendance.length > 0) {
                    course.attendances[0].attendance.forEach(element => {
                        const formatt = {
                            status: 'absent',
                            value: 0,
                            date: element.date
                        }
                        course.attendances[course.attendances.length - 1].attendance.push(formatt);
                    });
                }
            }
            user.save().then(() => {
                course.save().then(() => {
                    res.status(200).json({
                        status: 'success',
                    });
                }).catch((err) => {
                    res.status(404).json({
                        status: 'error',
                        message: err,
                    });
                });
            }).catch((err) => {
                res.status(404).json({
                    status: 'error',
                    message: err,
                });
            });
        });
    }).catch((err) => {
        res.status(400).json({
            status: 'error',
            err
        });
    });
};

const handleSaveAttendance = (req, res) => {
    const newAttend = req.body.attendances
    newAttend.forEach(element => {
        element.date = req.body.date
    });
    Course.findById(req.params.courseId).then((course) => {
        const attendances = course.attendances;

        for (let i = 0; i < attendances.length; i++) {
            attendances[i].attendance.push(newAttend[i]);
        }

        course.attendances = attendances;
        // console.log(course)
        // res.status(200).json({
        //     status: 'success',
        //     data: course
        // });
        course.save().then(() => {
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


const EditUserAttendance = (req, res) => {
    Course.findById(req.params.courseId).then((course) => {
        let attendances = course.attendances;
        // console.log(attendances)
        let useratts = attendances.find((att) => {
            const idd = att._id.toString()
            return idd === req.body.userAttendance
        })
        // console.log(useratts)
        if (useratts) {
            const currAttIndex = useratts.attendance.findIndex((att) => {
                const idd = att._id.toString()
                return idd === req.body._id
            });

            const currAtt = useratts.attendance[currAttIndex]

            const newcurrAtt = {
                ...currAtt._doc,
                value: req.body.value,
                status: req.body.status,
            };

            useratts.attendance[currAttIndex] = newcurrAtt;

            attendancesIndex = attendances.findIndex((att) => {
                const idd = att._id.toString()
                return idd === req.body.userAttendance;
            });
            attendances[attendancesIndex] = useratts;

            course.attendances = attendances;


            // res.status(200).json({
            //     status: 'success',
            //     // data: attendances
            // });

            course.save().then(() => {
                res.status(200).json({
                    status: 'success',
                });
            }).catch((err) => {
                res.status(400).json({
                    status: 'error',
                    err
                });
            });
        } else {
            res.status(400).json({
                status: 'error',
                err
            });
        }
        course.attendances = attendances;


        // course.save().then(() => {
        //     res.status(200).json({
        //         status: 'success',
        //     });
        // }).catch((err) => {
        //     res.status(400).json({
        //         status: 'error',
        //         err
        //     });
        // });
    }).catch((err) => {
        console.log(err)
        res.status(400).json({
            status: 'error',
            err
        });
    });
};

module.exports = {
    createCourse,
    deleteCourse,
    getCourses,
    enrollCourse,
    handleSaveAttendance,
    EditUserAttendance,
};
