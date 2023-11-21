import React from 'react'
import './Screen.css'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Location } from 'react-router-dom';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const Screen = () => {
    const { sname } = useParams();

    const location = useLocation();
    const params = useParams()
    const searchParams = new URLSearchParams(location.search);


    const date = searchParams.get('date')
    const { _id, city, screenid } = params
    console.log(_id, city, screenid)

    const [screen, setScreen] = React.useState(null)
    const [selectedTime, setSelectedTime] = React.useState(null)

    const getschedules = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_API}/movie/schedulebymovie/${screenid}/${date}/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    console.log(response.data)
                    setScreen(response.data)
                    setSelectedTime(response.data.movieSchedulesforDate[0])
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))

    }

    const [movie, setMovie] = React.useState(null)


    const getMovie = async () => {
        await fetch(`${process.env.REACT_APP_BACKEND_API}/movie/movies/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log('movie', data.data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    React.useEffect(() => {
        getschedules()
        getMovie()
    }, [])


    const [selectedSeats, setSelectedSeats] = React.useState([])




    const selectdeselectseat = (seat) => {
        console.log(seat)
        // {
        //     "row": "F",
        //     "col": 1,
        //     "seat_id": "6",
        //     "price": 500
        // }
        const isselected = selectedSeats.find((s) => (
            s.row === seat.row &&
            s.col === seat.col &&
            s.seat_id === seat.seat_id
        ))

        if (isselected) {
            setSelectedSeats(selectedSeats.filter((s) => (
                s.row !== seat.row ||
                s.col !== seat.col ||
                s.seat_id !== seat.seat_id
            )))
        }

        else {
            setSelectedSeats([...selectedSeats, seat])
        }
    }


    const generateSeatLayout = () => {
        // const x = screen.movieSchedulesforDate.findIndex((t) => t.showTime === selectedTime.showTime)

        const x = screen?.movieSchedulesforDate?.findIndex((t) => t.showTime === selectedTime.showTime);

        if (x === -1 || !screen?.movieSchedulesforDate[x]?.notAvailableSeats) {
            // Handle the case where selectedTime is not found or notAvailableSeats is undefined
            return null;
        }

        let notavailableseats = screen.movieSchedulesforDate[x].notAvailableSeats
        console.log(notavailableseats)

        return (
            <>
                <div>
                    {screen.screen.seats.map((seatType, index) => (
                        <div className="seat-type" key={index}>
                            <h2>{seatType.type} - Rs. {seatType.price}</h2>
                            <div className='seat-rows'>
                                {seatType.rows.map((row, rowIndex) => (
                                    <div className="seat-row" key={rowIndex}>
                                        <p className="rowname">{row.rowname}</p>
                                        <div className="seat-cols">
                                            {row.cols.map((col, colIndex) => (


                                                <div className="seat-col" key={colIndex}>
                                                    {col.seats.map((seat, seatIndex) => (
                                                        // console.log(seat),

                                                        <div key={seatIndex}>

                                                            {
                                                                notavailableseats.find((s) => (
                                                                    s.row === row.rowname &&
                                                                    s.seat_id === seat.seat_id &&
                                                                    s.col === colIndex
                                                                )) ?
                                                                    <span className='seat-unavailable'>
                                                                        {seatIndex + 1}
                                                                    </span>
                                                                    :
                                                                    <span className={
                                                                        selectedSeats.find((s) => (
                                                                            s.row === row.rowname &&
                                                                            s.seat_id === seat.seat_id &&
                                                                            s.col === colIndex
                                                                        )) ? "seat-selected" : "seat-available"
                                                                    }
                                                                        onClick={() => selectdeselectseat({
                                                                            row: row.rowname,
                                                                            col: colIndex,
                                                                            seat_id: seat.seat_id,
                                                                            price: seatType.price
                                                                        })}
                                                                    >
                                                                        {seatIndex + 1}
                                                                    </span>
                                                            }


                                                            {/* {seat.status === 'available' &&
                                                                <span className={
                                                                    selectedSeats.find((s) => (
                                                                        s.row === row.rowname &&
                                                                        s.seat_id === seat.seat_id &&
                                                                        s.col === colIndex
                                                                    )) ? "seat-selected" : "seat-available"
                                                                }
                                                                    onClick={() => selectdeselectseat({
                                                                        row: row.rowname,
                                                                        col: colIndex,
                                                                        seat_id: seat.seat_id,
                                                                        price: seatType.price
                                                                    })}
                                                                >
                                                                    {seatIndex + 1}
                                                                </span>
                                                            }
                                                            {seat.status === 'not-available' &&
                                                                <span className="seat-unavailable">
                                                                    {seatIndex + 1}
                                                                </span>
                                                            } */}
                                                        </div>


                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                        <br /> <br /> <br />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </>
        );
    };


    const handleBooking = () => {


        fetch(`${process.env.REACT_APP_BACKEND_API}/movie/bookticket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                showTime: selectedTime.showTime,
                showDate: date,
                movieId: _id,
                screenId: screenid,
                seats: selectedSeats,
                totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
                paymentId: '123456789',
                paymentType: 'online'
            })

        })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    toast.success('Booking Successful')
                    console.log(response)
                    window.location.href="/profile"
                }
                else {
                    console.log(response)
                }
            })
            .catch(err => console.log(err))
    }

    // const movie = {
    //     moviename: 'Tiger',
    //     screen: '4Dx',
    //     date: new Date(),
    //     language: 'Hindi',
    //     type: 'Action/Thriller',
    //     screens: [
    //         {
    //             name: 'Screen 1',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         },
    //         {
    //             name: 'Screen 2',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         },
    //         {
    //             name: 'Screen 3',
    //             location: 'PVR Cinemas, Forum Mall, Koramangala'
    //         }
    //     ]
    // }

    return (
        <div className='selectseatpage'>
            {
                movie && screen &&
                <div className='s1'>
                    <div className='head'>
                        <h1>{movie.title} - {screen?.screen?.name}</h1>
                        <h3>{movie.genre.join(" / ")}</h3>
                    </div>
                </div>
            }

            {
                screen &&
                <div className="selectseat">
                    <div className='timecont'>
                        {
                            screen.movieSchedulesforDate.map((time, index) => (
                                <h3 className={selectedTime?._id === time._id ? 'time selected' : 'time'}
                                    onClick={() => {
                                        setSelectedTime(time)
                                        setSelectedSeats([])
                                    }} key={index}>
                                    {time.showTime}
                                </h3>
                            ))
                        }
                    </div>
                    <div className='indicators'>
                        <div>
                            <span className='seat-unavailable'></span>
                            <p>Not available</p>
                        </div>
                        <div>
                            <span className='seat-available'></span>
                            <p>Available</p>
                        </div>
                        <div>
                            <span className='seat-selected'></span>
                            <p>Selected</p>
                        </div>
                    </div>

                    {generateSeatLayout()}


                    <div className='totalcont'>
                        <div className='total'>
                            <h2>Total</h2>
                            <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                        </div>

                        {/* <Link href="/" className='theme_btn1 linkstylenone'>Continue</Link> */}
                        <button
                            className='theme_btn1 linkstylenone'
                            onClick={handleBooking}
                        >Book Now</button>
                    </div>
                </div>
            }
            {/* 

    <div className="selectseat"> 
      
    </div> */}
        </div>
    )
}

export default Screen