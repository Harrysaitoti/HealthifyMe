const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection string
const MONGODB_URI = 'mongodb://localhost:27017/healthifyme';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    // Start the server after successful MongoDB connection
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the HealthifyMe: Personalized Fitness Tracker');
});

app.get('/exercises', (req, res) => {
  res.send('List of exercises');
});

app.get('/goals', (req, res) => {
  res.send('Set and view goals');
});

app.get('/progress', (req, res) => {
  res.send('Track progress over time');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
