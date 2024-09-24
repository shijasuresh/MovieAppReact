import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react';
import MovieCard from '../components/MovieCard';

function Home() {
    const [movieName, setMovieName] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    const searchMovie = async () => {
        if (movieName.trim() === '') {
            alert('Please enter a movie name');
            return;
        }

        const apiLink = `https://www.omdbapi.com/?apikey=61e576a4&t=${movieName}`;

        const response = await axios.get(apiLink)
        if(response.data.Response === 'True') {
            setSearchResults(response.data)
            console.log(response.data)
        }
        else {
            setError(response.data.Error)
        }
    }
  return (
    <div>
        <div className="w-[90vw] mx-auto flex justify-between items-center py-5">
            <Link to={'/'} className='text-white font-bold'>Ombd Movies</Link>
            <div className="text-white font-light flex gap-4 items-center">
                <Link className='border border-x-neutral-100 py-2 px-4 rounded-md'>Login</Link>
            </div>
        </div>

        <div className="header text-center">
            <h2 className="text-neutral-300 text-3xl font-bold">Search unlimited movies, TV shows and more</h2>
            <p className="text-neutral-400 text-lg">Ready to watch? Enter a movie name to check if it's a good choice!</p>
            <div className="flex mt-3">
                <input type="text" className="px-4 py-3 text-white" placeholder="Search a movie ..." value={movieName} onChange={(e) => setMovieName(e.target.value)} />
                <button className="btn" onClick={searchMovie}>Search Movie</button>
            </div>
        </div>

        {
            ({searchResults} && !error) ? <div className="w-[70vw] mx-auto mt-10 border-0 flex justify-center">
            {
                <MovieCard key={searchResults.imdbID} img={searchResults.Poster} imdbID={searchResults.imdbID} title={searchResults.Title} />
            }
            </div> : ""
        }
        

        <h1 className="text-3xl font-bold text-center my-36 text-neutral-100" id="error">{error}</h1>
    </div>
  )
}

export default Home
