import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row } from 'react-bootstrap';
import News from './Component/News';
import './App.css';

function App() {

  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNews, setFilteredNews] = useState([]);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios.get(`https://newsapi.org/v2/everything?q=tesla&from=2024-10-09&sortBy=publishedAt&apiKey=${apiKey}`)
      .then(response => {
        setNews(response.data.articles);
        setFilteredNews(response.data.articles);
        console.log(response.data.articles); // Handle the response data
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Handle errors
      });
  }, []);

  useEffect(() => {
    // Update filteredData when searchQuery changes
    const filtered = news.filter(item =>
      item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredNews(filtered);
  }, [searchQuery, news]);

  const handleDelete = (url) => {
    const updatedNews = news.filter(article => article.url !== url);
    setNews(updatedNews);
    setFilteredNews(updatedNews);
  };

  return (
    <section className='my-4'>
      <Container>
        <Row>
          <h1>News App</h1>
          <input
            type="text"
            className='form-control mb-4'
            placeholder="Search by title"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {filteredNews.length > 0 ? (
            filteredNews.map(item => (
              <News
                key={item.url}
                title={item.title}
                description={item.description}
                image={item.urlToImage}
                url={item.url}
                date={item.publishedAt}
                authorName={item.author}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <p>No news articles found.</p>
          )}
        </Row>
      </Container>
    </section>
  );
}

export default App;
