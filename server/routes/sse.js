const express = require('express');
const router = express.Router();
const { getFaqAnswer } = require('../data/faqLogic'); 

let clients = [];

router.get('/faq', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.flushHeaders();

  const clientId = Date.now();
  const newClient = { id: clientId, res };
  clients.push(newClient);

  console.log(`👤 Client connected: ${clientId}. Total: ${clients.length}`);

  res.write(`data: ${JSON.stringify({ message: 'Welcome! Ask me anything.' })}\n\n`);

  req.on('close', () => {
    clients = clients.filter(client => client.id !== clientId);
    console.log(`❌ Client disconnected: ${clientId}. Remaining: ${clients.length}`);
  });
});

router.post('/faq', express.json(), (req, res) => {
  const question = req.body.question || '';
  const answer = getFaqAnswer(question);

  clients.forEach(client =>
    client.res.write(`data: ${JSON.stringify({ message: answer })}\n\n`)
  );

  res.json({ answer });
});

module.exports = router;
