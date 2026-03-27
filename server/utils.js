const User = require('./models/User');
const Notification = require('./models/Notification');

const BADGES = {
    FIRST_REFLECTION: {
        badgeId: 'first_reflection',
        name: 'First Reflection',
        icon: '🌟',
        description: 'Completed your very first daily reflection!'
    },
    STREAK_7: {
        badgeId: 'streak_7',
        name: '7-Day Streak',
        icon: '🔥',
        description: 'Maintained a reflection streak for 7 consecutive days!'
    },
    CONSISTENCY_30: {
        badgeId: 'consistency_30',
        name: 'Consistency Master',
        icon: '🏆',
        description: 'Completed 30 reflections in total!'
    }
};

const updateStreakAndBadges = async (userId, reflectionCount) => {
    const user = await User.findById(userId);
    if (!user) return;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const lastActivity = user.lastActivityDate ? new Date(user.lastActivityDate.getFullYear(), user.lastActivityDate.getMonth(), user.lastActivityDate.getDate()) : null;

    // 1. Update Streak
    if (!lastActivity) {
        user.streakCount = 1;
    } else {
        const diffTime = Math.abs(today - lastActivity);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            // Consecutive day
            user.streakCount += 1;
        } else if (diffDays > 1) {
            // Missed a day
            user.streakCount = 1;
        }
        // If diffDays === 0, already active today (don't increment twice)
    }
    user.lastActivityDate = now;

    // 2. Check for Badges
    const newBadges = [];
    
    // First Reflection
    if (!user.badges.some(b => b.badgeId === BADGES.FIRST_REFLECTION.badgeId)) {
        newBadges.push(BADGES.FIRST_REFLECTION);
    }

    // 7-Day Streak
    if (user.streakCount >= 7 && !user.badges.some(b => b.badgeId === BADGES.STREAK_7.badgeId)) {
        newBadges.push(BADGES.STREAK_7);
    }

    // 30 Reflections
    if (reflectionCount >= 30 && !user.badges.some(b => b.badgeId === BADGES.CONSISTENCY_30.badgeId)) {
        newBadges.push(BADGES.CONSISTENCY_30);
    }

    // Add new badges and create notifications
    for (const badge of newBadges) {
        user.badges.push(badge);
        await Notification.create({
            userId: user._id,
            title: 'Badge Unlocked! 🏆',
            message: `Congratulations! You've earned the ${badge.name} badge.`,
            type: 'BADGE'
        });
    }

    // Streak notification
    if (user.streakCount > 1 && (!lastActivity || today > lastActivity)) {
        await Notification.create({
            userId: user._id,
            title: 'Streak Update! 🔥',
            message: `Great consistency! You're on a ${user.streakCount} day streak.`,
            type: 'STREAK'
        });
    }

    await user.save();
    return user;
};

module.exports = { updateStreakAndBadges, BADGES };
