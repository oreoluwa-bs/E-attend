const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: { type: String, required: true, trim: true },
    // author: { type: String, required: true, trim: true },
    attendances: [{
        name: { type: String, required: true, trim: true },
        idNumber: { type: String, required: true, trim: true },
        attendance: [{
            date: { type: Date, required: true },
            status: { type: String, required: true, trim: true },
            value: { type: Number, required: true },
        }]
    },
    ],
});


module.exports = mongoose.model('Course', courseSchema);
