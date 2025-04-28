const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');
const routes = require('./routes/index');
const path = require('path');
const cors = require('cors');

dotenv.config();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors({
  origin: CLIENT_URL 
}));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);



connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);

    });
  })
  .catch((err) => {
    console.error('Error connecting to DB:', err);
  });
