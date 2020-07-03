const mongoose = require('mongoose');

const meetupSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    attendances: [{
        name: { type: String, required: true, trim: true },
        attendance: [{
            date: { type: Date, required: true },
            status: { type: String, required: true, trim: true },
            value: { type: Number, required: true },
        }]
    },
    ],
});


module.exports = mongoose.model('Meetup', meetupSchema);
