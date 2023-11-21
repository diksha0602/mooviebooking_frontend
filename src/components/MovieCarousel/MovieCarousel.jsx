import React,{useState} from 'react'
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { MovieCardType } from '../../types/types.tsx';
import MovieCard from './MovieCard.jsx';
import { Location } from 'react-router-dom';

const MovieCarousel = () => {


    const [user, setUser] = useState(null)
    const getuser = async () => {
        try {
          const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/auth/getuser`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
          const response = await res.json();
          if (response.ok) {
            setUser(response.data);
          } else {
            window.location.href = '/auth/signin';
          }
        } catch (error) {
          console.log(error);
        }
      };
    



    const [movies, setMovies] = useState([])

    const getMovies = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/movie/movies`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();
      console.log(data)
      if (data.ok) {
        console.log(data);
        setMovies(data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

    React.useEffect(() => {
        getMovies()
        getuser()
    }, [])

    // const movies=[
    //     {
    //        title: "Tiger",
    //        imageUrl: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ny44LzEwICAxMjMuN0sgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00313411-ktfkqbudat-portrait.jpg",
    //        _id: "1",
    //        rating: 8.5,
    //        type: "Action/Thriller"
    //     },

    //     {
    //         title:"Tiger",
    //         imageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ny44LzEwICAxMjMuN0sgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00313411-ktfkqbudat-portrait.jpg",
    //         _id:"1",
    //         rating:8.5, 
    //         type:"Action/Thriller"
    //     },
    //     {
    //         title:"Tiger",
    //         imageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ny44LzEwICAxMjMuN0sgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00313411-ktfkqbudat-portrait.jpg",
    //         _id:"1",
    //         rating:8.5,
    //         type:"Action/Thriller"
    //     },{
    //         title:"Tiger",
    //         imageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ny44LzEwICAxMjMuN0sgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00313411-ktfkqbudat-portrait.jpg",
    //         _id:"1",
    //         rating:8.5,
    //         type:"Action/Thriller"
    //     },{
    //         title:"Tiger",
    //         imageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ny44LzEwICAxMjMuN0sgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00313411-ktfkqbudat-portrait.jpg",
    //         _id:"1",
    //         rating:8.5,
    //         type:"Action/Thriller"
    //     },
    //     {
    //         title:"Tiger",
    //         imageUrl:"https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:oi-discovery-catalog@@icons@@star-icon-202203010609.png,ox-24,oy-615,ow-29:ote-Ny44LzEwICAxMjMuN0sgVm90ZXM%3D,ots-29,otc-FFFFFF,oy-612,ox-70:q-80/et00313411-ktfkqbudat-portrait.jpg",
    //         _id:"1",
    //         rating:8.5,
    //         type:"Action/Thriller"
    //     }
    // ]
  return (
    <div className='sliderout'>
            {
                movies && user &&
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
                    movies.map((Movie) => {
                        return (
                            <SwiperSlide key={Movie._id}>
                                <MovieCard 
                                    {...Movie}
                                    Movie={Movie}
                                    user={user}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
            }
        </div>
  )
}

export default MovieCarousel