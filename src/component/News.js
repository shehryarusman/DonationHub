import { React, useEffect, useState} from 'react'
import axios from 'axios';

function News() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/news')
            .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
            })
            .then(data => {
            setData(data);
            console.log(data)
            })
            .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            });
        }, []);
  return (
    <div>
        <h1>Welcome to today News</h1>
    </div>
  )
}

export default News
