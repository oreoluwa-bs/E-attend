const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    idNumber: { type: String, required: true, unique: true, trim: true },
    enrolledCourses: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }],
    createdCourses: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Course' }]
    // meetups: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Meetup' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
