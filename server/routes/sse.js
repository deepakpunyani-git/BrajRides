const express = require('express');
const router = express.Router();
const faqData = require('../data/faqData');

router.get('/faq', (req, res) => {
  const question = req.query.question || '';

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const answer = faqData.getFaqAnswer(question);

  res.write(`data: ${JSON.stringify({ question, answer })}\n\n`);

  setTimeout(() => res.end(), 1000);
});

module.exports = router;
