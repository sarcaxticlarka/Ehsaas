const mongoose = require('mongoose');

const moodEntrySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    mood: {
        type: String,
        enum: ['Happy', 'Sad', 'Calm', 'Angry', 'Stressed', 'Excited', 'Tired'],
        required: true
    },
    intensity: {
        type: Number,
        min: 1,
        max: 10,
        default: 5
    },
    reflection: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('MoodEntry', moodEntrySchema);
