import React ,{useState} from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import './MoviePage.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BsShare } from 'react-icons/bs'
import { BsFillStarFill } from 'react-icons/bs';
import CelebCard from '../CelebCards/Celebcards';
import MovieCarousel from '../MovieCarousel/MovieCarousel';
import { useLocation } from 'react-router-dom';

const MoviePage = (data) => {
    const { city, _id } = useParams();
    const location = useLocation();
    const pathname = location.pathname;
    
    // const { movieid } = useParams()

    const [movie, setMovie] = useState(null)
    // console.log(movieid)
    // console.log(pathname)


    const getMovie = async () => {
        fetch(`${process.env.REACT_APP_BACKEND_API}/movie/movies/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log(data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    React.useEffect(() => {
        getMovie()
    }, [])



    // const movie = {
    //     wideposter: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/listing/xxlarge/tiger-3-et00313411-1698386589.jpg",
    //     portraitposter: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/tiger-3-et00313411-1698386589.jpg",
    //     Title: "Tiger",
    //     rating: "8.5",
    //     halls: ["2D", "4D"],
    //     languages: ["Hindi", "Telugu", "Tamil"],
    //     duration: "2h 15m",
    //     type: "Action/Thriller",
    //     releasedate: "12 Nov,2023",

    //     cast: [
    //         {
    //             _id: "1",
    //             name: "Salman Khan",
    //             role: "Actor",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/salman-khan-1991-12-09-2017-01-53-43.jpg"
    //         },
    //         {
    //             _id: "1",
    //             name: "Salman Khan",
    //             role: "Actor",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/salman-khan-1991-12-09-2017-01-53-43.jpg"
    //         },
    //         {
    //             _id: "1",
    //             name: "Salman Khan",
    //             role: "Actor",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/salman-khan-1991-12-09-2017-01-53-43.jpg"
    //         }
    //     ],

    //     crew: [
    //         {
    //             _id: "1",
    //             name: "Salman Khan",
    //             role: "Actor",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/salman-khan-1991-12-09-2017-01-53-43.jpg"
    //         },
    //         {
    //             _id: "1",
    //             name: "Salman Khan",
    //             role: "Actor",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/salman-khan-1991-12-09-2017-01-53-43.jpg"
    //         },
    //         {
    //             _id: "1",
    //             name: "Salman Khan",
    //             role: "Actor",
    //             imageUrl: "https://assets-in.bmscdn.com/iedb/artist/images/website/poster/large/salman-khan-1991-12-09-2017-01-53-43.jpg"
    //         }
    //     ],
    //     description:"Tiger and Zoya are back - to save the country and their family. This time it`s personal!"
    // }


    


    return (
        <>{
            movie &&
            <div className='moviepage'>
            <div className='c1' style={{
                backgroundImage: `url(${movie.landscapeImgUrl})`
            }}>
                <div className='c11'>
                    <div className='left'>
                        <div className='movie_poster'
                            style={{
                                backgroundImage: `url(${movie.portraitImgUrl})`
                            }}
                        >
                            <p>In cinemas</p>
                        </div>
                        <div className='movie_details'>
                            <p className='title'>
                                {movie.title}
                            </p>
                            <p className='rating'>
                                <BsFillStarFill className='star' />&nbsp;&nbsp;
                                {movie.rating}/10
                            </p>

                            {/* <div className='halls_languages'>
                                <p className='halls'>
                                    {
                                        movie.halls.map((hall, index) => {
                                            return (
                                                <span key={index}>{hall} </span>
                                            )
                                        })
                                    }
                                </p>
                                <p className='languages'>
                                    {movie.languages.map((language, index) => {
                                        return (
                                            <span key={index}>{language} </span>
                                        )
                                    })}
                                </p>
                            </div> */}

                            <p className='duration_type_releasedat'>
                                <span className='duration'>
                                    {movie.duration}
                                </span>
                                <span>•</span>
                                <span className='type'>
                                    {movie.genre.join(', ')}
                                    {/* {movie.type} */}
                                </span>
                                {/* <span>•</span>
                                <span className='releasedat'>
                                    {movie.releasedate}
                                </span> */}
                            </p>

                            <Link
                                to={`${pathname}/buytickets`}
                                className='linkstylenone'
                            > 
                                <button className='bookbtn'>Book Tickets</button>
                             </Link>

                        </div>
                    </div>
                    <div className='right'>
                        <button className='sharebtn'><BsShare className='shareicon' />Share</button>
                    </div>
                </div>
            </div>
            

            <div className='c2'>
                <h1>About the Movie</h1>
                <p>{movie.description}</p>
                {
                    movie.cast.length > 0 &&
                    <div className='circlecardslider'>
                        <div className='line'></div>

                        <h1>Cast</h1>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={1}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                '@0.00': {
                                    slidesPerView: 1,
                                    spaceBetween: 2,
                                },
                                '@0.75': {
                                    slidesPerView: 2,
                                    spaceBetween: 2,
                                },
                                '@1.00': {
                                    slidesPerView: 3,
                                    spaceBetween: 2,
                                },
                                '@1.50': {
                                    slidesPerView: 6,
                                    spaceBetween: 2,
                                },
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {
                                movie.cast.map((cast, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <CelebCard {...cast} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                }
                
                { 
                        movie.crew.length>0 &&
                    <div className='circlecardslider'>
                        <div className='line'></div>

                        <h1>Crew</h1>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={1}
                            pagination={{
                                clickable: true,
                            }}
                            breakpoints={{
                                '@0.00': {
                                    slidesPerView: 1,
                                    spaceBetween: 2,
                                },
                                '@0.75': {
                                    slidesPerView: 2,
                                    spaceBetween: 2,
                                },
                                '@1.00': {
                                    slidesPerView: 3,
                                    spaceBetween: 2,
                                },
                                '@1.50': {
                                    slidesPerView: 6,
                                    spaceBetween: 2,
                                },
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                        >
                            {
                                movie.crew.map((cast, index) => {
                                    return (
                                        <SwiperSlide key={index}>
                                            <CelebCard {...cast} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                }

                <div className='line'></div>
                <h1>Your might also like</h1>
                <MovieCarousel />
            </div>

        </div>
            }
        </>
       
        
    )
}

export default MoviePage

