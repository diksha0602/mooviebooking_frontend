import React from 'react'
import { MovieCardType } from '../../types/types.tsx';
import { Routes } from 'react-router-dom';
// import { useRouter } from 'next/navigation';
import { BsFillStarFill } from 'react-icons/bs';
import './MovieCard.css'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const MovieCard = (data) => {
    // const router = useRouter(   )
    const { _id, title, genre, rating, portraitImgUrl } = data.Movie;
    const { city } = data.user;
    
  return (
    <Link
        className='moviecard'
        to={`/${city}/movies/${_id}`}

        >
            <div className='movieimg'
                style={{
                    backgroundImage: `url(${portraitImgUrl})`
                }}
            >
                <p className='rating'>
                    <BsFillStarFill className='star' />&nbsp;&nbsp;
                    {rating}/10</p>
            </div>
            <div className='details'>
                <p className='title'>
                    {title}
                </p>
                <p className='type'>
                {genre.join(", ")}
                </p>
            </div>
        </Link>

        /* <Link to={`/${city}/movies/${_id}`} className='moviecard'>
      MovieCard
    </Link> */
  )
}

export default MovieCard