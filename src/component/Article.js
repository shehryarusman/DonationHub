import React from 'react'

function Article({ img, sentiment, source, summary, title, url }) {
    return (
        <div>
          <img src={img} alt={title} />
          <h2>{title}</h2>
          <p>{summary}</p>
          <p>{source}</p>
          <p>{sentiment}</p>
          <a href={url}>Read More</a>
        </div>
    )
}

export default Article



