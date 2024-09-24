import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';

function Details() {
    const {imdbID} = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const apiLink = `https://www.omdbapi.com/?apikey=61e576a4&i=${imdbID}`;
        
        const fetchMovieDetails = async () => {
            const response = await axios.get(apiLink);
            console.log('API Response:', response.data);
            if (response.data.Response === 'True') {
                setMovie(response.data);
                console.log(response.data)
                setError('');
            }
        };
        fetchMovieDetails();
    }, [imdbID]);

    if (!movie) {
        return <h2 className="text-center text-white">Loading...</h2>;
    }

  return (
    <div>
        <div className="w-[90vw] mx-auto flex justify-between items-center py-5">
            <Link to={'/'} className='text-white font-bold'>Ombd Movies</Link>
            <div className="text-white font-light flex gap-4 items-center">
                <Link to='/' className="px-4 py-2 text-white top-5 right-10 border border-neutral-200 rounded-md ">Go Back</Link>
            </div>
        </div>

        <div id="container" className="w-[60vw] mx-auto mt-16">
        <div className="flex gap-10 text-neutral-200">
            <div className='w-1/2'>
                <h1 className="text-2xl font-bold" id="title">{movie.Title}</h1>
                <p className="text-md" id="desc">{movie.Plot}</p>
                <p className="my-1">Genre: <span id="genre" className="text-neutral-200">{movie.Genre}</span></p>
                <p className="my-1">Actors: <span id="actors" className="text-neutral-200">{movie.Actors}</span></p>
                <p className="my-1">Directors: <span id="directors" className="text-neutral-200">{movie.Director}</span></p>
                <p className="my-1">Release Date: <span id="date" className="text-neutral-200">{movie.Released}</span></p>
                <p className="my-1">Awards: <span id="awards" className="text-neutral-200">{movie.Awards}</span></p>
                <p className="my-1">Box office collection: <span id="collection" className="text-neutral-200">{movie.BoxOffice}</span></p>
                <p className="my-1">Languages: <span id="languages" className="text-neutral-200">{movie.Language}</span></p>
                <p className="my-1">IMDB Ratings: <span id="ratings" className="text-neutral-200">{movie.imdbRating}</span></p>
            </div>
            <div className="banner">
                <img id="poster" className="rounded-xl h-[350px] w-300px]" src={movie.Poster} alt="" />
                <div className="suggestion"></div>
            </div>            
        </div>        
    </div>
    </div>
  )
}

export default Details
