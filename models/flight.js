const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['LAX', 'SFO', 'IAD', 'BOS'],
    },
    arrival: Date
});

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['Spirit', 'United', 'JetBlue', 'American']
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            return new Date().getFullYear();
        }
    },
    airport: {
        type: String,
        enum: ['LAX', 'SFO', 'IAD', 'BOS'],
        default: 'IAD'
    },
    destinations: [destinationSchema]
});

module.exports = mongoose.model('Flight', flightSchema);