const generateSuggestions = (user, recentEntries) => {
    let suggestions = [];

    // Base Case: No entries yet
    if (!recentEntries || recentEntries.length === 0) {
        suggestions.push({
            title: "Start Tracking",
            message: "Log your mood for a few days so we can generate personalized insights for you.",
            icon: "📝"
        });
        return suggestions;
    }

    // 1. Analyze Mood Trends
    const moodCounts = {};
    let totalIntensity = 0;
    
    recentEntries.forEach(entry => {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        totalIntensity += entry.intensity;
    });

    // Find Dominant Mood
    const dominantMood = Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
    const avgIntensity = totalIntensity / recentEntries.length;

    // 2. Demographic Analysis (Profession & Age)
    const prof = (user.profession || "").toLowerCase();
    const age = user.ageCategory || "";
    const isDeskJob = prof.includes('engineer') || prof.includes('developer') || prof.includes('student') || prof.includes('designer') || prof.includes('manager') || prof.includes('office');

    // 3. Generate tailored suggestions based on Dominant Mood + Context
    
    if (dominantMood === 'Stressed' || dominantMood === 'Angry') {
        if (isDeskJob) {
            suggestions.push({
                title: "Screen-time Break",
                message: "High stress often correlates with long screen sessions. Try the 20-20-20 rule: every 20 minutes, look 20 feet away for 20 seconds.",
                icon: "💻"
            });
        }
        if (avgIntensity >= 7) {
            suggestions.push({
                title: "Deep Breathing",
                message: "Your stress/anger intensity has been high lately. A 3-minute box breathing session can rapidly lower your cortisol levels.",
                icon: "🫁"
            });
        }
    }

    if (dominantMood === 'Tired') {
        if (age === 'Under 18' || age === '18-24') {
            suggestions.push({
                title: "Sleep Consistency",
                message: "Tiredness at your age is often tied to shifting sleep schedules. Try going to bed at the exact same time this weekend.",
                icon: "🛌"
            });
        } else {
            suggestions.push({
                title: "Afternoon Rest",
                message: "You've been logging mostly 'Tired' lately. Ensure you are staying hydrated and try to take a 15-minute power nap mid-day if possible.",
                icon: "💧"
            });
        }
    }

    if (dominantMood === 'Sad') {
        suggestions.push({
            title: "Social Connection",
            message: "When feeling low, reaching out to just one close friend or family member for a 5-minute chat can significantly boost endorphins.",
            icon: "💬"
        });
        
        if (!isDeskJob) {
            suggestions.push({
                title: "Physical Activity",
                message: "A simple 10-minute walk outside can naturally elevate your mood through bilateral stimulation.",
                icon: "🚶"
            });
        }
    }

    if (dominantMood === 'Happy' || dominantMood === 'Calm') {
        suggestions.push({
            title: "Keep the Momentum!",
            message: "You've been feeling great recently. Write down one specific thing you did differently this week so you can repeat it in the future.",
            icon: "✨"
        });
        
        if (user.primaryGoal) {
            suggestions.push({
                title: `Working towards: ${user.primaryGoal}`,
                message: "Your positive emotional state makes this the perfect time to build new habits for your primary goal.",
                icon: "🎯"
            });
        }
    }

    // Goal-Specific Catch-alls
    if (user.primaryGoal === 'Better Sleep' && dominantMood !== 'Tired') {
         suggestions.push({
            title: "Wind Down Routine",
            message: "Since you're working on better sleep, remember to dim the lights 1 hour before bed tonight.",
            icon: "🌙"
        });
    }

    // Limit to 3 suggestions max so we don't overwhelm the user
    return suggestions.slice(0, 3);
};

module.exports = { generateSuggestions };
