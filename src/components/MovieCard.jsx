import { Link } from 'react-router-dom';

function MovieCard({img, imdbID}) {
    return(
        <>
            <Link to={`/details/${imdbID}`}>
                <div className="">
                    <img src={img} className="w-40 h-56 rounded-xl object-cover flex-grow" alt="" />
                </div>
            </Link>
        </>
    )
}

export default MovieCard;