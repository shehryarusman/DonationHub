import { useState, useEffect } from 'react';

function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch('http://127.0.0.1:5000/news',{
            mode: 'cors',
            method: 'GET',
            headers:{
                'Content-Type': 'application/json'
            },
        }); // Replace with the URL of your Flask server
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error(error);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className='news-page'>
      <h1>Latest News</h1>
      {/* {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.summary}</p>
        </div>
      ))} */}
    </div>
  );
}

export default News;
