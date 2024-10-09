import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './News.css'; // Optional: Create this file for custom styles

const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  // Replace 'YOUR_API_KEY' with your actual News API key
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const apiUrl = `http://localhost:5000/api/news`;


  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setArticles(response.data.articles.slice(0, 5)); // Limit to 5 articles
      })
      .catch((err) => {
        setError("Unable to fetch news. Please try again later.");
      });
  }, []);

  return (
    <div className="news-container">
      <h2>Latest News Headlines</h2>
      {error && <p className="error-message">{error}</p>}
      <ul className="news-list">
        {articles.map((article, index) => (
          <li key={index} className="news-item">
            <h3>{article.title}</h3>
            <p>Source: {article.source.name}</p>
            <p>Published At: {new Date(article.publishedAt).toLocaleString()}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
