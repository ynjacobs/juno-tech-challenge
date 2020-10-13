import React from 'react';

import axios from 'axios';
import './styles.css';

export default class App extends React.Component {
  state = {
    movies: [],
    showing: false,
    details: [],
    genre: "",
  }

  // description() {
  //   // alert(movies.overview);
  //   this.showing = true
  // }
  handleClick = (movieId, event)=> {
    event.currentTarget.classList.toggle('active');
    this.props.handleClickk && this.props.handleClick(movieId); 
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=c1c06a942715cee34cef2401ebe90113&language=en-US`)
      .then(res => {
        const details = res.data;
        const genre = res.data.genres[0].name;
        this.setState({ details });
        this.setState({genre})
        console.log(details);
        this.showing = true;
      })
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=c1c06a942715cee34cef2401ebe90113`)
      .then(res => {
        const movies = res.data.results.sort(function(a, b) {
          return new Date(b.release_date) - new Date(a.release_date);
      });
      const baseUrl = 'https://api.themoviedb.org/3/movie/upcoming?api_key=c1c06a942715cee34cef2401ebe90113'

const getIndicatorByCountry = async ( page = 1) => {  
  const query = `${baseUrl}&${page}`
  const res = await axios.get(query)  
  const movies = res.data.results.sort(function(a, b) {
    return new Date(b.release_date) - new Date(a.release_date);
});

  if (movies[0].pages > page) {
    return movies.concat(await getIndicatorByCountry(page+1)) 
  } else {
    return movies
    
  }
}
        
        this.setState({ movies });
        console.log(movies);
        
      }
      )
  };

  render() {
    const { details } = this.state;
    const { genre } = this.state; 
    // const hi = showing ? details.runtime: 'hi';
    return (
      <div>
      <h1 className="title">Tiff's movies of the year</h1>
      <div className="outer">
      {
        this.state.movies.map((movie, i) => {
          return (
            
            <div className="movie" onClick={this.handleClick.bind(this, movie.id)} key={i}>{movie.title}
              <div className="opening"><ul><li>Description: {movie.overview}</li> <li> Genre: {genre}</li> <li>Runtime: {details.runtime} min</li> <li>tagline: {details.tagline}</li></ul></div>
            </div>
            
          );
          
        })
      }
      </div>
      
      </div>
    )

    
  }
}