const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const Notification = require('../models/Notification');

const MoodEntry = require('../models/MoodEntry');

// Get current user profile
router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').lean();
        const reflectionCount = await MoodEntry.countDocuments({ userId: req.user.id });
        res.json({ ...user, reflectionCount });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update profile
router.patch('/profile', auth, async (req, res) => {
    try {
        const { name, bio, profilePic, gender, profession, ageCategory, primaryGoal } = req.body;
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (bio !== undefined) updates.bio = bio;
        if (profilePic !== undefined) updates.profilePic = profilePic;
        if (gender !== undefined) updates.gender = gender;
        if (profession !== undefined) updates.profession = profession;
        if (ageCategory !== undefined) updates.ageCategory = ageCategory;
        if (primaryGoal !== undefined) updates.primaryGoal = primaryGoal;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Change Password
router.post('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);
        
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) return res.status(400).json({ error: 'Current password incorrect' });

        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Notifications
router.get('/notifications', auth, async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register
router.post('/register', async (req, res) => {
    try {
        const { email, password, name, gender, profession, ageCategory, primaryGoal } = req.body;
        
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'User already exists' });

        user = new User({ 
            email, 
            password, 
            name,
            gender: gender || '',
            profession: profession || '',
            ageCategory: ageCategory || '',
            primaryGoal: primaryGoal || ''
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const userProfile = user.toObject();
        delete userProfile.password;
        
        res.status(201).json({ token, user: userProfile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Invalid credentials' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const userProfile = user.toObject();
        delete userProfile.password;

        res.json({ token, user: userProfile });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
