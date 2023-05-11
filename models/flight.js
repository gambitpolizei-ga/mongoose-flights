const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    airport: {
        type: String,
        enum: ['LAX', 'SFO', 'IAD', 'BOS'],
    },
    arrival: {
        type: Date,
    }
})

const flightSchema = new Schema({
    airline: {
        type: String,
        enum: ['Spirit', 'United', 'JetBlue', 'American'],
    },
    flightNo: {
        type: Number,
        min: 10,
        max: 9999
    },
    departs: {
        type: Date,
        default: function() {
            return new Date(new Date().setFullYear(new Date ().getFullYear() + 1));
        }
    },
    airport: {
        type: String,
        enum: ['LAX', 'SFO', 'IAD', 'BOS'],
        default: 'IAD'
    },
    destinations: [destinationSchema],
});

module.exports = mongoose.model('Flight', flightSchema);