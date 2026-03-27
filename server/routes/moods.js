const express = require('express');
const mongoose = require('mongoose');
const MoodEntry = require('../models/MoodEntry');
const auth = require('../middleware/auth');
const router = express.Router();

const { updateStreakAndBadges } = require('../utils');

// Create Mood Entry
router.post('/', auth, async (req, res) => {
    try {
        const { mood, intensity, reflection } = req.body;
        const entry = new MoodEntry({
            userId: req.user.id,
            mood,
            intensity,
            reflection
        });
        await entry.save();

        // Update streak and badges
        const totalReflections = await MoodEntry.countDocuments({ userId: req.user.id });
        const user = await updateStreakAndBadges(req.user.id, totalReflections);

        res.status(201).json({ entry, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Mood History
router.get('/history', auth, async (req, res) => {
    try {
        const entries = await MoodEntry.find({ userId: req.user.id }).sort({ timestamp: -1 });
        res.json(entries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const { generateSuggestions } = require('../services/suggestionEngine');

// Get Analytics (Last 7 days Trends & Distribution)
router.get('/analytics', auth, async (req, res) => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // 1. Mood Distribution
        const distribution = await MoodEntry.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user.id), timestamp: { $gte: sevenDaysAgo } } },
            { $group: { _id: '$mood', count: { $sum: 1 }, avgIntensity: { $avg: '$intensity' } } }
        ]);

        // 2. Daily Intensity Trends
        const trends = await MoodEntry.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user.id), timestamp: { $gte: sevenDaysAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    avgIntensity: { $avg: "$intensity" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json({ distribution, trends });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Personalized Suggestions (Demographic + 7-day mood context)
router.get('/suggestions', auth, async (req, res) => {
    try {
        const User = mongoose.model('User');
        const user = await User.findById(req.user.id);
        
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const recentEntries = await MoodEntry.find({ 
            userId: req.user.id, 
            timestamp: { $gte: sevenDaysAgo } 
        });

        const suggestions = generateSuggestions(user, recentEntries);
        res.json(suggestions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Calendar Heatmap Data (All Time)
router.get('/calendar', auth, async (req, res) => {
    try {
        const entries = await MoodEntry.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
            { $sort: { timestamp: 1 } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    dominantMood: { $last: "$mood" }
                }
            }
        ]);
        
        const colorMap = {
            'Happy': '#FAD9C1',
            'Calm': '#D1EAE3',
            'Angry': '#FFB2B2',
            'Sad': '#B2DFFF',
            'Tired': '#E1DFFF',
            'Stressed': '#D1D1D1'
        };

        const markedDates = {};
        entries.forEach(entry => {
            markedDates[entry._id] = { 
                selected: true, 
                selectedColor: colorMap[entry.dominantMood] || '#1A1A1A'
            };
        });

        res.json(markedDates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
