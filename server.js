// server.js
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'face_login',  // Replace with your database name
  password: 'admin',
  port: 5432,
});

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files to "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save files with unique names
  }
});

const upload = multer({ storage: storage });

// Create the 'users' table if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone_number VARCHAR(20),
    designation VARCHAR(100),
    photo VARCHAR(255)
  );
`, (err, res) => {
  if (err) {
    console.error('Error creating table', err);
  } else {
    console.log('Table "users" is ready.');
  }
});

// Handle registration form submission
app.post('/register', upload.single('photo'), (req, res) => {
  const { fullName, email, phone, designation } = req.body;
  const photo = req.file ? req.file.filename : null;

  pool.query(
    'INSERT INTO users (name, email, phone_number, designation, photo) VALUES ($1, $2, $3, $4, $5)',
    [fullName, email, phone, designation, photo],
    (error, results) => {
      if (error) {
        console.error('Error saving to database', error);
        res.status(500).send('Error saving your profile. Please try again.');
      } else {
        res.status(200).send('Your profile has been registered successfully!');
      }
    }
  );
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
