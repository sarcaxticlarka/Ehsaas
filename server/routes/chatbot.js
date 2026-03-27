const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// AI Copilot Cognitive Behavioral Therapy (CBT) Responses
const CBT_RESPONSES = [
  "I'm really holding space for you right now. It is completely valid that you feel this way. What do you think triggered this?",
  "That sounds heavy. Taking a deep breath right now might help ground you. What is the most immediate thing causing this?",
  "Sometimes anxiety tells us stories that aren't entirely true. If a friend told you this, what advice would you give them?",
  "Thank you for sharing that with me. Feelings are like waves; they peak and then they break. We just have to ride this one out.",
  "I hear you. That must be exhausting to carry. Let's focus on what is within our control right now. What is one small thing you can do for yourself?",
  "It takes a lot of courage to be honest about how you're doing. I am proud of you for reflecting today.",
  "When we are overwhelmed, our brains try to protect us by over-analyzing. Is there a fact right now that contradicts your worry?"
];

// @route   POST /chat
// @desc    Send a message to the AI Guide and get a CBT-based response
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message text is required to chat.' });
        }

        // 1. Simulate "AI Thinking..." organic typing delay (1.5s - 2.5s)
        const delay = Math.floor(Math.random() * 1000) + 1500;
        await new Promise(resolve => setTimeout(resolve, delay));

        // 2. [Future Expansion]: Check for process.env.GEMINI_API_KEY here to route to LLM
        
        // 3. Fallback to highly-curated CBT statements for MVP
        const randomResponse = CBT_RESPONSES[Math.floor(Math.random() * CBT_RESPONSES.length)];

        res.json({
            reply: randomResponse,
            timestamp: new Date()
        });

    } catch (err) {
        console.error("Chatbot Error:", err);
        res.status(500).json({ error: 'The AI Guide is currently resting. Please try again later.' });
    }
});

module.exports = router;
