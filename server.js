// server.js

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

// API key from environment variable
const apiKey = process.env.REACT_APP_NEWS_API_KEY;

// Route to fetch news articles
app.get('/api/news', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
    res.json({ articles: response.data.articles });
  } catch (error) {
    console.error("Error fetching news:", error.message); // Log the error for debugging
    res.status(500).json({ message: "Error fetching news." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
