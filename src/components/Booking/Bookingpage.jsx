import React from 'react'
import DatePicker from "react-horizontal-datepicker";
import './BuyTicketsPage.css'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Bookingpage = () => {
    const { city, _id } = useParams();
    const location = useLocation();
    const pathname = location.pathname;

    // const { movieid, cityname } = params
    const [movie, setMovie] = React.useState(null)
    const [theatres, setTheatres] = React.useState(null)
    const [selectedDate, setSelectedDate] = React.useState(new Date())
    console.log(_id)



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

    const getTheatres = async (date) => {
        let movieId = _id
        let sity = city
        console.log(sity)
        console.log(date)
        fetch(`${process.env.REACT_APP_BACKEND_API}/movie/screensbymovieschedule/${sity}/${date}/${movieId}`, {
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
                    setTheatres(data.data)
                }
                else {
                    console.log(data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // const movie = {
    //         moviename: 'Tiger',
    //         screen: '4Dx',
    //         date: new Date(),
    //         language: 'Hindi',
    //         type: 'Action/Thriller',
    //         screens: [
    //             {
    //                 name: 'Screen 1',
    //                 location: 'PVR Cinemas, Forum Mall, Koramangala'
    //             },
    //             {
    //                 name: 'Screen 2',
    //                 location: 'PVR Cinemas, Forum Mall, Koramangala'
    //             },
    //             {
    //                 name: 'Screen 3',
    //                 location: 'PVR Cinemas, Forum Mall, Koramangala'
    //             }
    //         ]
    //     }

    React.useEffect(() => {
        getMovie()
    }, [])

    React.useEffect(() => {
        getTheatres(selectedDate)
    }, [selectedDate])


    return (
        <>
            {   movie &&
                <div className='buytickets'>
                    <div className='s1'>
                        <div className='head'>
                            <h1>{movie.title} - {movie.language}</h1>
                            <h3>{movie.genre.join(",")}</h3>
                        </div>
                        <DatePicker getSelectedDay={
                            (date) => {
                                console.log(date)
                                setSelectedDate(date)
                            }
                            }
                            endDate={100}
                            selectDate={
                            selectedDate
                            }
                            labelFormat={"MMMM"}
                            color={"rgb(248, 68, 100)"}
                        />
                    </div>

                    {
                        theatres && theatres.length > 0 &&
                        <div className='screens'>
                            {
                                theatres.map((screen, index) => {
                                    let screenid = screen._id
                                    const sname = screen.name;
                                    return (
                                        <div className='screen' key={index}>
                                            <div>
                                                <h2>{sname}</h2>
                                                <h3>{screen.location}</h3>
                                            </div>

                                            <Link to={`${pathname}/${screenid}?date=${selectedDate}`} className='theme_btn1 linkstylenone'>Select</Link>
                                            {/* <Link to={`${pathname}/${sname}`} className='theme_btn1 linkstylenone'>Select</Link> */}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Bookingpage