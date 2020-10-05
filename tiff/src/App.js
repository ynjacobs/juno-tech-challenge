import React from 'react';

import axios from 'axios';

export default class App extends React.Component {
  state = {
    movies: []
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=c1c06a942715cee34cef2401ebe90113`)
      .then(res => {
        const movies = res.data.results;
        this.setState({ movies });
        console.log(movies);
        
      })
  }

  render() {
    return (
      <ul>
        { this.state.movies.map( movies => <li>{movies.title}</li>)}
      </ul>
    )
  }
}