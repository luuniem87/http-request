import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
   const [movies, setMovies] = useState([]) //empty array of movies
   const [isLoading, setIsLoading] = useState(false) //state for showing loading indicator while API is loading
   const [error, setError] = useState(null) //state for error if api throws error during fetch

   async function  fetchMoviesHandler() { //fetch movies from api
    setIsLoading(true) //display while API is loading
    setError(null); //set any previous errors to null
    try { //use try catch when using async await. 
      const response = await fetch('https://swapi.dev/api/films'); //use .catch here if not using async await
      if(!response.ok){ //throw an error if unsuccessful response from api.
        throw new Error('Something went wrong')
      }
      const data = await response.json(); //gets data from API

      const transformedMovies = data.results.map(movieData =>{ //transform movie data key to my own key that I set in MovieList component
        return{
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          };
        });
        setMovies(transformedMovies);
    } catch(error) {
         setError(error.message)
         
        }
        setIsLoading(false) //reset even if error occurred
  };

  //set the content to display with conditions. If movie length is more than 0 then display list. If there is error with fetching then throw error. If it is taking time to load then show loading message.
  let content = <p>Found no movies.</p>

  if(movies.length > 0){
    content = <MoviesList movies={movies} />
  } else if (error){
    content = <p>{error}</p>
  } else if(isLoading){
    content = <p>Loading...</p>
  }

 

  return (
    <React.Fragment>
      <section>
        <button onClick = {fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && movies.length > 0 && } 
        {!isLoading && movies.length === 0 && !error && <p>Found no movies</p>} 
        {isLoading && <p>Loading...</p>} 
        {!isLoading && error && <p>{error}</p>} */}
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
