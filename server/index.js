const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const routes = require('./routes/index');
const path = require('path');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const faqData = require('./data/faqData'); 

dotenv.config();
const PORT = process.env.PORT || 3001;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


io.on('connection', (socket) => {
  // console.log('User connected:', socket.id);

  socket.on('faqQuestion', (message) => {
    // console.log('Received question:', message);
    const answer = faqData.getFaqAnswer(message);
    socket.emit('faqAnswer', { question: message, answer });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error connecting to DB:', err);
  });

module.exports = { app, io };
