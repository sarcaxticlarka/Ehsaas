const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Non-binary', 'Prefer not to say', ''],
        default: ''
    },
    ageCategory: {
        type: String,
        enum: ['Under 18', '18-24', '25-34', '35-44', '45-54', '55+', ''],
        default: ''
    },
    profession: {
        type: String,
        default: ''
    },
    primaryGoal: {
        type: String,
        default: ''
    },
    streakCount: {
        type: Number,
        default: 0
    },
    lastActivityDate: {
        type: Date,
        default: null
    },
    badges: [{
        badgeId: String,
        name: String,
        icon: String,
        description: String,
        earnedAt: {
            type: Date,
            default: Date.now
        }
    }]
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function() {
    if (!this.isModified('password')) return;
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
        throw err;
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
