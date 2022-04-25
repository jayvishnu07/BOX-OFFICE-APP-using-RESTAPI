import React, { useState } from 'react';
import MainPageLayout from '../components/MainPageLayout';

const Home = () => {
  const [input, setinput] = useState('');
  const [results, setResults] = useState(null)
  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(r => r.json())
      .then(result => {
        setResults(result)
        console.log(result);
      })
  };
  const onInputChange = (ev) => {
    setinput(ev.target.value);
  }

  const onKeyDown = (ev) => {
    if (ev.keyCode === 13) {
      onSearch()
    }
  }

  const resultRender = () => {
    if (results && results.length === 0) {
      return <div>No result found</div>
    }
    if (results && results.length > 0) {
      console.log(results);
      return (<div>
        {results.map(item => (
          <div key={item.show.id}>{item.show.name}</div>
        ))}
        </div>)
    }
    return null
  };



  return <MainPageLayout>
    <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} value={input} />
    <button type='button' onClick={onSearch}>Search</button>
    {resultRender()}
  </MainPageLayout>;
};

export default Home;
