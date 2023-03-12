// import { useEffect, useState } from 'react';
// import Article from './Article';

// function News() {
//   const [articles, setArticles] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetch('http://127.0.0.1:5000/news',{
//         mode: 'cors',
//         method: 'GET',
//         headers:{
//             'Content-Type': 'application/json'
//         },
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch news');
//       }
//       return response.json();
//     })
//     .then(data => {
//       setArticles(data);
//       setIsLoading(false);
//     })
//     .catch(error => console.error(error));
//   },[])
//   console.log(articles)
//   return (
//     <div>
//       {isLoading && <Spinner />} {/* Render Spinner component when isLoading is true */}
//       {!isLoading && articles && articles.length > 0 ? (
//         articles.map((article) => (
//           <Article {...article} key={article.title} />
//         ))
//       ) : (
//         <p>No articles found.</p>
//       )}
//     </div>
//   );
// }

// function Spinner() {
//   return <div className="spinner" />;
// }

// export default News;

import { useEffect, useState } from 'react';
import Article from './Article';

function News() {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/news',{
        mode: 'cors',
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      return response.json();
    })
    .then(data => {
      setArticles(data);
      setLoading(false);
    })
    .catch(error => {
      console.error(error);
      setLoading(false);
    });
  }, [])

  return (
    <div>
      {loading && <Spinner />} {/* Render Spinner component when loading is true */}
      {!loading && articles && articles.length > 0 ? (
        articles.map((article) => (
          <Article {...article} key={article.title} />
        ))
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
}

function Spinner() {
  return <div className="spinner" />;
}

export default News;
