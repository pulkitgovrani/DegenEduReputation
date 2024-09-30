const express = require('express');
const natural = require('natural');
const router = express.Router();

const sentimentAnalyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

router.post('/reputation', (req, res) => {
    const { feedback } = req.body;
    const sentimentScore = sentimentAnalyzer.getSentiment(feedback);

    // Convert sentiment score to reputation scale (0 to 100)
    const reputationScore = Math.min(Math.max(Math.floor((sentimentScore + 5) * 10), 0), 100);

    res.json({ reputationScore });
});

module.exports = router;
